// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import {IERC20} from 'openzeppelin/token/ERC20/IERC20.sol';
import {IRouterClient} from 'chainlink-ccip/ccip/interfaces/IRouterClient.sol';
import {OwnerIsCreator} from 'chainlink-ccip/shared/access/OwnerIsCreator.sol';
import {Client} from 'chainlink-ccip/ccip/libraries/Client.sol';
import {CCIPReceiver} from 'chainlink-ccip/ccip/applications/CCIPReceiver.sol';
import {LinkTokenInterface} from 'chainlink/interfaces/LinkTokenInterface.sol';

/// @title ChainlinkMessenger
/// @author cairoeth
/// @notice Messenger contract for sending/receiving string data across chains via the Chalink CCIP.
contract ChainlinkMessenger is CCIPReceiver, OwnerIsCreator {
    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    bytes32 private lastReceivedMessageId; // Store the last received messageId.
    string private lastReceivedText; // Store the last received text.

    LinkTokenInterface linkToken;

    /// @notice Mapping to keep track of whitelisted destination chains.
    mapping(uint64 => bool) public whitelistedDestinationChains;

    /// @notice Mapping to keep track of whitelisted source chains.
    mapping(uint64 => bool) public whitelistedSourceChains;

    /// @notice Mapping to keep track of whitelisted senders.
    mapping(address => bool) public whitelistedSenders;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    // Event emitted when a message is sent to another chain.
    // The chain selector of the destination chain.
    // The address of the receiver on the destination chain.
    // The text being sent.
    // the token address used to pay CCIP fees.
    // The fees paid for sending the CCIP message.
    event MessageSent( // The unique ID of the CCIP message.
        bytes32 indexed messageId,
        uint64 indexed destinationChainSelector,
        address receiver,
        string text,
        address feeToken,
        uint256 fees
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived( // The unique ID of the CCIP message.
        // The chain selector of the source chain.
        // The address of the sender from the source chain.
        // The text that was received.
    bytes32 indexed messageId, uint64 indexed sourceChainSelector, address sender, string text);

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.

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

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) CCIPReceiver(_router) {
        linkToken = LinkTokenInterface(_link);
    }

    /*//////////////////////////////////////////////////////////////
                               SEND LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Sends a transaction payload to another Beacon on the destination chain.
    /// @dev Pays for fees in native gas, so assumes contract holds native gas.
    /// @param destinationChain The identifier of the destination chain.
    /// @param destinationAddress The address of the recipient on the destination chain.
    /// @param payload The payload to be sent.
    /// @return messageId The ID of the CCIP message that was sent.
    function sendPayloadPayNative(uint64 destinationChain, address destinationAddress, string calldata payload)
        external
        onlyWhitelistedDestinationChain(destinationChain)
        returns (bytes32 messageId)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(destinationAddress, payload, address(0));

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());

        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(destinationChain, evm2AnyMessage);

        if (fees > address(this).balance) {
            revert NotEnoughBalance(address(this).balance, fees);
        }

        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend{value: fees}(destinationChain, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(messageId, destinationChain, destinationAddress, payload, address(0), fees);

        // Return the CCIP message ID
        return messageId;
    }

    /// @notice Sends a transaction payload to another Beacon on the destination chain.
    /// @dev Pays for fees in LINK, so assumes contract holds sufficient LINK.
    /// @param destinationChain The identifier of the destination chain.
    /// @param destinationAddress The address of the recipient on the destination chain.
    /// @param payload The payload to be sent.
    /// @return messageId The ID of the CCIP message that was sent.
    function sendPayloadPayLINK(uint64 destinationChain, address destinationAddress, string calldata payload)
        external
        onlyWhitelistedDestinationChain(destinationChain)
        returns (bytes32 messageId)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(destinationAddress, payload, address(linkToken));

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());

        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(destinationChain, evm2AnyMessage);

        if (fees > linkToken.balanceOf(address(this))) {
            revert NotEnoughBalance(linkToken.balanceOf(address(this)), fees);
        }

        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        linkToken.approve(address(router), fees);

        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend(destinationChain, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(messageId, destinationChain, destinationAddress, payload, address(linkToken), fees);

        // Return the CCIP message ID
        return messageId;
    }

    /*//////////////////////////////////////////////////////////////
                             RECEIVE LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Receives and handles a cross-chain payload from another Beacon.
    /// @dev This function is executed within the CCIPReceiver contract.
    /// @param payload A EVM2AnyMessage struct containing the CCIP payload details.
    function _ccipReceive(Client.Any2EVMMessage memory payload)
        internal
        override
        onlyWhitelistedSourceChain(payload.sourceChainSelector) // Make sure source chain is whitelisted
        onlyWhitelistedSenders(abi.decode(payload.sender, (address))) // Make sure the sender is whitelisted
    {
        lastReceivedMessageId = payload.messageId; // fetch the messageId
        lastReceivedText = abi.decode(payload.data, (string)); // abi-decoding of the sent text

        emit MessageReceived(
            payload.messageId,
            payload.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(payload.sender, (address)), // abi-decoding of the sender address,
            abi.decode(payload.data, (string))
        );
    }

    /*//////////////////////////////////////////////////////////////
                                HELPERS
    //////////////////////////////////////////////////////////////*/

    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for sending a text.
    /// @param _receiver The address of the receiver.
    /// @param _text The string data to be sent.
    /// @param _feeTokenAddress The address of the token used for fees. Set address(0) for native gas.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildCCIPMessage(address _receiver, string calldata _text, address _feeTokenAddress)
        internal
        pure
        returns (Client.EVM2AnyMessage memory)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver), // ABI-encoded receiver address
            data: abi.encode(_text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array aas no tokens are transferred
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit and non-strict sequencing mode
                Client.EVMExtraArgsV1({gasLimit: 200_000, strict: false})
                ),
            // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
            feeToken: _feeTokenAddress
        });
        return evm2AnyMessage;
    }

    /// @notice Fetches the details of the last received message.
    /// @return messageId The ID of the last received message.
    /// @return text The last received text.
    function getLastReceivedMessageDetails() external view returns (bytes32 messageId, string memory text) {
        return (lastReceivedMessageId, lastReceivedText);
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
