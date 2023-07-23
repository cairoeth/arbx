// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin/token/ERC20/utils/SafeERC20.sol";
import {Strings} from "openzeppelin/utils/Strings.sol";
import {PbBridge} from "./libraries/PbBridge.sol";
import {IWETH} from "./interfaces/IWETH.sol";
import {Pool} from "./Pool.sol";

import {AxelarMessenger} from "./messengers/Axelar.sol";
import {ChainlinkMessenger} from "./messengers/Chainlink.sol";
import {HyperlaneMessenger} from "./messengers/Hyperlane.sol";

/// @title Beacon
/// @author cairoeth
/// @notice Liquidity-pool based beacon for cross-chain trades.
contract Beacon is Pool {
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    mapping(bytes32 => bool) public transfers;
    mapping(address => uint256) public minSend; // send _amount must > minSend
    mapping(address => uint256) public maxSend;

    AxelarMessenger public axelarMessenger;
    ChainlinkMessenger public chainlinkMessenger;
    HyperlaneMessenger public hyperlaneMessenger;

    // min allowed max slippage uint32 value is slippage * 1M, eg. 0.5% -> 5000
    uint32 public minimalMaxSlippage;

    enum Messengers {
        None,
        AxelarNative,
        ChainlinkToken,
        ChainlinkNative,
        Hyperlane
    }

    struct Trade {
        bytes payload;
        address dex;
        uint64 chainId;
        Messengers messenger;
    }

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event ExecutedTrade(address dex, bytes payload);

    event StartedTrades(Trade[] trades);

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    error FailedTrade(address dex, bytes payload);
    error UnauthorizedMessenger(address caller);
    error UnusupportedDex(uint64 chainId, address dex);

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    /// @notice Modifier that checks if the caller is an authorized messenger.
    modifier onlyAuthorizedMessenger() {
        if (
            msg.sender != address(axelarMessenger) && msg.sender != address(chainlinkMessenger)
                && msg.sender != address(hyperlaneMessenger)
        ) {
            revert UnauthorizedMessenger(msg.sender);
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Establishes the supported messengers and destination chains.
    /// @param axelar The address of the Axelar messenger.
    /// @param chainlink The address of the Chainlink messenger.
    /// @param hyperlane The address of the Hyperlane messenger.
    constructor(address axelar, address chainlink, address hyperlane) {
        // Establish the messengers.
        axelarMessenger = AxelarMessenger(axelar);
        chainlinkMessenger = ChainlinkMessenger(chainlink);
        hyperlaneMessenger = HyperlaneMessenger(hyperlane);
    }

    /*//////////////////////////////////////////////////////////////
                             TRADE ENTRY
    //////////////////////////////////////////////////////////////*/

    /// @notice Starts a trade across any supported chain via a given messenger.
    /// @dev This should be the entrypoint for arbitrage opportunities.
    /// @param trades A list of trades.
    function startTrade(Trade[] calldata trades) external nonReentrant whenNotPaused {
        // Fetch the first leg of the trade.
        Trade memory trade = trades[0];

        // Fetch the id of the current chain.
        uint64 thisChain;
        assembly {
            thisChain := chainid()
        }

        // Check the first trade matches this chain.
        if (thisChain != trade.chainId) revert UnsupportedChain(trade.chainId);
        // Check that the decentralied exchange is supported.
        if (!statusDex[trade.chainId][trade.dex]) revert UnusupportedDex(trade.chainId, trade.dex);

        // Execute the first leg of the trade.
        (bool success,) = trade.dex.call(trade.payload);
        // Check that it was successful (it can revert if this Beacon doesn't hold enough funds to execute the trade)
        if (!success) revert FailedTrade(trade.dex, trade.payload);

        // Loop over remaining trades and send them to the across beacons.
        for (uint256 i = 1; i < trades.length; i++) {
            trade = trades[i];

            if (!statusChain[trade.chainId]) revert UnsupportedChain(trade.chainId);
            if (!statusDex[trade.chainId][trade.dex]) revert UnusupportedDex(trade.chainId, trade.dex);

            // Check the messenger and send the trade across chaisn with the correct messenger.
            // NOTE: Assumes that the cross-chain Beacon has the same address, which can not work in chains like zkSync.
            if (trade.messenger == Messengers.AxelarNative) {
                // Send the trade to the Axelar messenger.
                axelarMessenger.sendPayloadPayNative(
                    Strings.toString(trade.chainId), string(abi.encodePacked(address(this))), trade.payload
                );
            } else if (trade.messenger == Messengers.ChainlinkToken) {
                // Send the trade to the Chainlink messenger.
                chainlinkMessenger.sendPayloadPayLINK(
                    trade.chainId, address(this), string(abi.encodePacked(trade.payload))
                );
            } else if (trade.messenger == Messengers.ChainlinkNative) {
                // Send the trade to the Chainlink messenger.
                chainlinkMessenger.sendPayloadPayNative(
                    trade.chainId, address(this), string(abi.encodePacked(trade.payload))
                );
            } else if (trade.messenger == Messengers.Hyperlane) {
                // Send the trade to the Hyperlane messenger.
                hyperlaneMessenger.sendPayloadPayNative(uint32(trade.chainId), string(abi.encodePacked(trade.payload)));
            } else {
                emit StartedTrades(trades);
            }
        }
    }

    /// @notice Receives a cross-chain trade from an authorized messenger.
    /// @param trade A trade to execute.
    function receiveTrade(Trade calldata trade) external nonReentrant whenNotPaused onlyAuthorizedMessenger {
        // Execute the trade with the given DEX and payload.
        (bool success,) = trade.dex.call(trade.payload);
        if (!success) revert FailedTrade(trade.dex, trade.payload);

        emit ExecutedTrade(trade.dex, trade.payload);
    }
}
