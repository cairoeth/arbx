// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import {Router} from "hyperlane/Router.sol";

/// @title HyperlaneMessenger
/// @author cairoeth
/// @notice Messenger contract for sending/receiving string data across chains via Hyperlane.
contract HyperlaneMessenger is Router {
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

    // ============ Events ============
    event SentHelloWorld(
        uint32 indexed origin,
        uint32 indexed destination,
        string message
    );
    event ReceivedHelloWorld(
        uint32 indexed origin,
        uint32 indexed destination,
        bytes32 sender,
        string message
    );
    event HandleGasAmountSet(
        uint32 indexed destination,
        uint256 handleGasAmount
    );

    constructor(address _mailbox, address _interchainGasPaymaster) {
        // Transfer ownership of the contract to deployer
        _transferOwnership(msg.sender);
        // Set the addresses for the Mailbox and IGP
        // Alternatively, this could be done later in an initialize method
        _setMailbox(_mailbox);
        _setInterchainGasPaymaster(_interchainGasPaymaster);
    }

    // ============ External functions ============

    /**
     * @notice Sends a message to the _destinationDomain. Any msg.value is
     * used as interchain gas payment.
     * @param _destinationDomain The destination domain to send the message to.
     * @param _message The message to send.
     */
    function sendHelloWorld(uint32 _destinationDomain, string calldata _message)
        external
        payable
    {
        sent += 1;
        sentTo[_destinationDomain] += 1;
        _dispatchWithGas(
            _destinationDomain,
            bytes(_message),
            HANDLE_GAS_AMOUNT,
            msg.value,
            msg.sender
        );
        emit SentHelloWorld(
            mailbox.localDomain(),
            _destinationDomain,
            _message
        );
    }

    // ============ Internal functions ============

    /**
     * @notice Handles a message from a remote router.
     * @dev Only called for messages sent from a remote router, as enforced by Router.sol.
     * @param _origin The domain of the origin of the message.
     * @param _sender The sender of the message.
     * @param _message The message body.
     */
    function _handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) internal override {
        received += 1;
        receivedFrom[_origin] += 1;
        emit ReceivedHelloWorld(
            _origin,
            mailbox.localDomain(),
            _sender,
            string(_message)
        );
    }
}
