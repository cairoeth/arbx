// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Beacon} from "../../src/Beacon.sol";
import {AxelarMessenger} from "../../src/messengers/Axelar.sol";
import {ChainlinkMessenger} from "../../src/messengers/Chainlink.sol";
import {HyperlaneMessenger} from "../../src/messengers/Hyperlane.sol";

abstract contract Deploy is Script {
    // Environment specific variables.
    address internal axelarMessenger;
    address internal chainlinkMessenger;
    address internal hyperlaneMessenger;

    // Deploy addresses.
    Beacon internal beacon;

    // Deployer key.
    uint256 internal funderKey;
    uint256 internal deployerKey;

    function setup(
        address[] memory tokens,
        address[] memory dexes,
        address axelarGateway,
        address axelarGasReceiver,
        address chainlinkRouter,
        address chainlinkLink,
        address hyperlaneMailbox,
        address hyperlaneITP
    ) internal {
        funderKey = vm.envUint("FUNDER_PRIVATE_KEY");
        deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        bool axelar = axelarGateway != address(0) && axelarGasReceiver != address(0);
        bool chainlink = chainlinkRouter != address(0) && chainlinkLink != address(0);
        bool hyperlane = hyperlaneMailbox != address(0) && hyperlaneITP != address(0);
        uint64 chainId;
        assembly {
            chainId := chainid()
        }

        // Fund deployer from funder address.
        vm.broadcast(funderKey);
        bool sent = payable(vm.addr(deployerKey)).send(((vm.addr(funderKey).balance) * 8) / 100);
        require(sent, "Deploy: funding failed");

        // Now with funds, deploy contracts as deployer.
        vm.startBroadcast(deployerKey);

        // Deploy messengers.
        if (axelar) {
            // 1. gateway, 2. gasReceiver
            axelarMessenger = address(new AxelarMessenger(axelarGateway, axelarGasReceiver));
        }

        if (chainlink) {
            // 1. router, 2. link
            chainlinkMessenger = address(new ChainlinkMessenger(chainlinkRouter, chainlinkLink));
        }
        
        if (hyperlane) {
            // 1. Mailbox, 2. interchain gas paymaster
            hyperlaneMessenger = address(new HyperlaneMessenger(hyperlaneMailbox, hyperlaneITP));
        }

        // Deploy Beacon implementation.
        beacon = new Beacon(axelarMessenger, chainlinkMessenger, hyperlaneMessenger);

        // Suport native chain.
        beacon.supportChain(chainId, true);

        // Add support for tokens.
        for (uint256 i = 0; i < tokens.length; i++) {
            beacon.supportToken(tokens[i], true);
        }

        // Add suport for dexes.
        for (uint256 i = 0; i < dexes.length; i++) {
            beacon.supportDex(chainId, dexes[i], true);
        }

        // Return funds to funder.
        sent = payable(vm.addr(funderKey)).send(((vm.addr(deployerKey).balance) * 8) / 100);
        require(sent, 'Deploy: funding failed');

        vm.stopBroadcast();
    }
}
