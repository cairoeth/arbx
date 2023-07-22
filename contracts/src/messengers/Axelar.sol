// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import {AxelarExecutable} from "axelar/executable/AxelarExecutable.sol";
import {IAxelarGasService} from "axelar/interfaces/IAxelarGasService.sol";
import {Ownable} from "openzeppelin/access/Ownable.sol";

/// @title AxelarMessenger
/// @author cairoeth
/// @notice Messenger contract for sending/receiving string data across chains via Axelar.
contract AxelarMessenger is Ownable, AxelarExecutable {
    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    string public value;
    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService public immutable gasService;

    /// @notice Mapping to keep track of whitelisted destination chains.
    mapping(uint64 => bool) public whitelistedDestinationChains;

    /// @notice Mapping to keep track of whitelisted source chains.
    mapping(uint64 => bool) public whitelistedSourceChains;

    /// @notice Mapping to keep track of whitelisted senders.
    mapping(address => bool) public whitelistedSenders;

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    // Custom errors to provide more descriptive revert messages.
    error DestinationChainNotWhitelisted(uint64 destinationChainSelector); // Used when the destination chain has not been whitelisted by the contract owner.
    error SourceChainNotWhitelisted(uint64 sourceChainSelector); // Used when the source chain has not been whitelisted by the contract owner.
    error SenderNotWhitelisted(address sender); // Used when the sender has not been whitelisted by the contract owner.

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    /// @dev Modifier that checks if the chain with the given destinationChainSelector is whitelisted.
    /// @param _destinationChainSelector The selector of the destination chain.
    modifier onlyWhitelistedDestinationChain(uint64 _destinationChainSelector) {
        if (!whitelistedDestinationChains[_destinationChainSelector]) {
            revert DestinationChainNotWhitelisted(_destinationChainSelector);
        }
        _;
    }

    /// @dev Modifier that checks if the chain with the given sourceChainSelector is whitelisted.
    /// @param _sourceChainSelector The selector of the destination chain.
    modifier onlyWhitelistedSourceChain(uint64 _sourceChainSelector) {
        if (!whitelistedSourceChains[_sourceChainSelector]) {
            revert SourceChainNotWhitelisted(_sourceChainSelector);
        }
        _;
    }

    /// @dev Modifier that checks if the chain with the given sourceChainSelector is whitelisted.
    /// @param _sender The address of the sender.
    modifier onlyWhitelistedSenders(address _sender) {
        if (!whitelistedSenders[_sender]) revert SenderNotWhitelisted(_sender);
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    /*//////////////////////////////////////////////////////////////
                               SEND LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Sends a transaction payload to another Beacon on the destination chain.
    /// @dev Pays for fees in native gas, so assumes contract holds sufficient native gas.
    /// @param destinationChain The identifier of the destination chain.
    /// @param destinationAddress The address of the recipient on the destination chain.
    /// @param payload The payload to be sent.
    function sendPayloadPayNative(
        string calldata destinationChain,
        string calldata destinationAddress,
        bytes calldata payload
    ) external payable {
        require(msg.value > 0, "Gas payment is required");

        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this), destinationChain, destinationAddress, payload, msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    /*//////////////////////////////////////////////////////////////
                             RECEIVE LOGIC
    //////////////////////////////////////////////////////////////*/

    // Handles calls created by setAndSend. Updates this contract's value
    function _execute(string calldata sourceChain_, string calldata sourceAddress_, bytes calldata payload_)
        internal
        override
    {
        (value) = abi.decode(payload_, (string));
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;
    }

    /*//////////////////////////////////////////////////////////////
                           CHAINS WHITELIST
    //////////////////////////////////////////////////////////////*/

    /// @dev Denylists a chain for transactions.
    /// @notice This function can only be called by the owner.
    /// @param _destinationChainSelector The selector of the destination chain to be denylisted.
    function denylistDestinationChain(uint64 _destinationChainSelector) external onlyOwner {
        whitelistedDestinationChains[_destinationChainSelector] = false;
    }

    /// @dev Whitelists a chain for transactions.
    /// @notice This function can only be called by the owner.
    /// @param _sourceChainSelector The selector of the source chain to be whitelisted.
    function whitelistSourceChain(uint64 _sourceChainSelector) external onlyOwner {
        whitelistedSourceChains[_sourceChainSelector] = true;
    }

    /// @dev Denylists a chain for transactions.
    /// @notice This function can only be called by the owner.
    /// @param _sourceChainSelector The selector of the source chain to be denylisted.
    function denylistSourceChain(uint64 _sourceChainSelector) external onlyOwner {
        whitelistedSourceChains[_sourceChainSelector] = false;
    }

    /*//////////////////////////////////////////////////////////////
                           SENDERS WHITELIST
    //////////////////////////////////////////////////////////////*/

    /// @dev Whitelists a sender.
    /// @notice This function can only be called by the owner.
    /// @param _sender The address of the sender.
    function whitelistSender(address _sender) external onlyOwner {
        whitelistedSenders[_sender] = true;
    }

    /// @dev Denylists a sender.
    /// @notice This function can only be called by the owner.
    /// @param _sender The address of the sender.
    function denySender(address _sender) external onlyOwner {
        whitelistedSenders[_sender] = false;
    }
}
