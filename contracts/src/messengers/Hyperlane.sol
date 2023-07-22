// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import {Router} from "hyperlane/Router.sol";

/// @title HyperlaneMessenger
/// @author cairoeth
/// @notice Messenger contract for sending/receiving string data across chains via Hyperlane.
contract HyperlaneMessenger is Router {
    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    // A generous upper bound on the amount of gas to use in the handle
    // function when a message is processed. Used for paying for gas.
    uint256 public constant HANDLE_GAS_AMOUNT = 50_000;

    // A counter of how many messages have been sent from this contract.
    uint256 public sent;
    // A counter of how many messages have been received by this contract.
    uint256 public received;

    // Keyed by domain, a counter of how many messages that have been sent
    // from this contract to the domain.
    mapping(uint32 => uint256) public sentTo;
    // Keyed by domain, a counter of how many messages that have been received
    // by this contract from the domain.
    mapping(uint32 => uint256) public receivedFrom;

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
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event SentHelloWorld(uint32 indexed origin, uint32 indexed destination, string message);
    event ReceivedHelloWorld(uint32 indexed origin, uint32 indexed destination, bytes32 sender, string message);
    event HandleGasAmountSet(uint32 indexed destination, uint256 handleGasAmount);

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

    constructor(address _mailbox, address _interchainGasPaymaster) {
        // Transfer ownership of the contract to deployer
        _transferOwnership(msg.sender);
        // Set the addresses for the Mailbox and IGP
        // Alternatively, this could be done later in an initialize method
        _setMailbox(_mailbox);
        _setInterchainGasPaymaster(_interchainGasPaymaster);
    }

    /*//////////////////////////////////////////////////////////////
                               SEND LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Sends a message to the _destinationDomain. Any msg.value is
    /// used as interchain gas payment.
    /// @param _destinationDomain The destination domain to send the message to.
    /// @param _message The message to send.
    function sendHelloWorld(uint32 _destinationDomain, string calldata _message) external payable {
        sent += 1;
        sentTo[_destinationDomain] += 1;
        _dispatchWithGas(_destinationDomain, bytes(_message), HANDLE_GAS_AMOUNT, msg.value, msg.sender);
        emit SentHelloWorld(mailbox.localDomain(), _destinationDomain, _message);
    }

    /*//////////////////////////////////////////////////////////////
                             RECEIVE LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Handles a message from a remote router.
    /// @dev Only called for messages sent from a remote router, as enforced by Router.sol.
    /// @param _origin The domain of the origin of the message.
    /// @param _sender The sender of the message.
    /// @param _message The message body.
    function _handle(uint32 _origin, bytes32 _sender, bytes calldata _message) internal override {
        received += 1;
        receivedFrom[_origin] += 1;
        emit ReceivedHelloWorld(_origin, mailbox.localDomain(), _sender, string(_message));
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
