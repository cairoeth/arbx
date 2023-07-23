// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "openzeppelin/security/ReentrancyGuard.sol";
import {IWETH} from "./interfaces/IWETH.sol";
import {PbPool} from "./libraries/PbPool.sol";
import {Pauser} from "./safeguard/Pauser.sol";
import {DelayedTransfer} from "./safeguard/DelayedTransfer.sol";
import {Signers} from "./Signers.sol";

/// @title Pool
/// @author cairoeth
/// @notice Liquidity pool functions for Beacon contract.
contract Pool is Signers, ReentrancyGuard, Pauser, DelayedTransfer {
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint64 public addseq; // ensure unique LiquidityAdded event, start from 1
    mapping(address => uint256) public minAdd; // add _amount must > minAdd

    // map of successful withdraws, if true means already withdrew money or added to delayedTransfers
    mapping(bytes32 => bool) public withdraws;

    // erc20 wrap of gas token of this chain, eg. WETH, when relay ie. pay out,
    // if request.token equals this, will withdraw and send native token to receiver
    // note we don't check whether it's zero address. when this isn't set, and request.token
    // is all 0 address, guarantee fail
    address public nativeWrap;

    // when transfer native token after wrap, use this gas used config.
    uint256 public nativeTokenTransferGas = 50000;

    mapping(uint64 => bool) public statusChain;
    mapping(uint64 => mapping(address => bool)) public statusDex;
    mapping(address => bool) public statusToken;

    address[] public supportedDexes;
    IERC20[] public supportedTokens;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    // liquidity events
    event LiquidityAdded(uint64 seqnum, address provider, address token, uint256 amount);
    event WithdrawDone(
        bytes32 withdrawId, uint64 seqnum, address receiver, address token, uint256 amount, bytes32 refid
    );
    event MinAddUpdated(address token, uint256 amount);

    event UpdatedChain(uint64 chainId, bool update);

    event UpdatedDex(uint64 chainId, address dex, bool update);

    event UpdatedToken(address token, bool update);

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    error UnsupportedChain(uint64 chainId);

    /*//////////////////////////////////////////////////////////////
                         ADD/WITHDRAW LIQUIDITY
    //////////////////////////////////////////////////////////////*/

    /// @notice Add liquidity to the pool-based bridge. This function DOES NOT SUPPORT fee-on-transfer / rebasing tokens.
    /// @param _token The address of the token.
    /// @param _amount The amount to add.
    function addLiquidity(address _token, uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount > minAdd[_token], "amount too small");
        addseq += 1;
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        emit LiquidityAdded(addseq, msg.sender, _token, _amount);
    }

    /// @notice Withdraw funds from the bridge pool.
    /// @param _wdmsg The serialized Withdraw protobuf.
    /// @param _sigs The list of signatures sorted by signing addresses in ascending order. A withdrawal must be
    /// signed-off by +2/3 of the bridge's current signing power to be delivered.
    /// @param _signers The sorted list of signers.
    /// @param _powers The signing powers of the signers.
    function withdraw(
        bytes calldata _wdmsg,
        bytes[] calldata _sigs,
        address[] calldata _signers,
        uint256[] calldata _powers
    ) external whenNotPaused {
        bytes32 domain = keccak256(abi.encodePacked(block.chainid, address(this), "WithdrawMsg"));
        verifySigs(abi.encodePacked(domain, _wdmsg), _sigs, _signers, _powers);
        // decode and check wdmsg
        PbPool.WithdrawMsg memory wdmsg = PbPool.decWithdrawMsg(_wdmsg);
        // len = 8 + 8 + 20 + 20 + 32 = 88
        bytes32 wdId =
            keccak256(abi.encodePacked(wdmsg.chainid, wdmsg.seqnum, wdmsg.receiver, wdmsg.token, wdmsg.amount));
        require(withdraws[wdId] == false, "withdraw already succeeded");
        withdraws[wdId] = true;
        uint256 delayThreshold = delayThresholds[wdmsg.token];
        if (delayThreshold > 0 && wdmsg.amount > delayThreshold) {
            _addDelayedTransfer(wdId, wdmsg.receiver, wdmsg.token, wdmsg.amount);
        } else {
            _sendToken(wdmsg.receiver, wdmsg.token, wdmsg.amount);
        }
        emit WithdrawDone(wdId, wdmsg.seqnum, wdmsg.receiver, wdmsg.token, wdmsg.amount, wdmsg.refid);
    }

    /*//////////////////////////////////////////////////////////////
                             TOKEN TRANSFER
    //////////////////////////////////////////////////////////////*/

    function _sendToken(address _receiver, address _token, uint256 _amount) internal {
        if (_token == nativeWrap) {
            // withdraw then transfer native to receiver
            IWETH(nativeWrap).withdraw(_amount);
            (bool sent,) = _receiver.call{value: _amount, gas: nativeTokenTransferGas}("");
            require(sent, "failed to send native token");
        } else {
            IERC20(_token).safeTransfer(_receiver, _amount);
        }
    }

    /*//////////////////////////////////////////////////////////////
                          PERMISSIONED FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @dev Updates the support status of a destination chain.
    /// @notice This function can only be called by the owner.
    /// @param chainId The id of the destination chain to be updated.
    /// @param update The new status of the chain, true for support and false for unsupport.
    function supportChain(uint64 chainId, bool update) external onlyOwner {
        statusChain[chainId] = update;
        emit UpdatedChain(chainId, update);
    }

    /// @dev Updates the support status of a decentralized exchange.
    /// @notice This function can only be called by the owner.
    /// @param chainId chain id where the decentralized exchange is located.
    /// @param dex The address of the decentralized exchange to update.
    /// @param update The new status of the decentralized exchange, true for support and false for unsupport.
    function supportDex(uint64 chainId, address dex, bool update) external onlyOwner {
        if (!statusChain[chainId]) revert UnsupportedChain(chainId);
        // If support, approve for all tokens and update the storage.
        if (update) {
            for (uint256 i = 0; i < supportedTokens.length; i++) {
                supportedTokens[i].approve(dex, type(uint256).max);
            }
        }
        // If unsupport, revoke approval for all tokens and update the storage.
        else {
            // If unsupport, revoke approval for all tokens and update the storage.
            for (uint256 i = 0; i < supportedTokens.length; i++) {
                supportedTokens[i].approve(dex, 0);
            }
        }
        statusDex[chainId][dex] = update;
        emit UpdatedDex(chainId, dex, update);
    }

    /// @dev Updates the support status of a token.
    /// @notice This function can only be called by the owner.
    /// @param token The address of the token to update.
    /// @param update The new status of the token, true for support and false for unsupport.
    function supportToken(address token, bool update) external onlyOwner {
        if (update) {
            // Loop over exchanges to give approval.
            for (uint256 i = 0; i < supportedDexes.length; i++) {
                IERC20(token).approve(supportedDexes[i], type(uint256).max);
            }
            supportedTokens.push(IERC20(token));
        } else {
            // Loop over exchanges to remove approval.
            for (uint256 i = 0; i < supportedDexes.length; i++) {
                IERC20(token).approve(supportedDexes[i], type(uint256).max);
            }

            for (uint256 i = 0; i < supportedTokens.length; i++) {
                if (address(supportedTokens[i]) == token) {
                    supportedTokens[i] = supportedTokens[supportedTokens.length - 1];
                    supportedTokens.pop();
                    break;
                }
            }
        }

        emit UpdatedToken(token, update);
    }
}
