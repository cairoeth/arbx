// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Beacon} from "../../src/Beacon.sol";
import {AxelarMessenger} from "../../src/messengers/Axelar.sol";
import {ChainlinkMessenger} from "../../src/messengers/Chainlink.sol";
import {HyperlaneMessenger} from "../../src/messengers/Hyperlane.sol";

abstract contract DeployBase is Script {
    // Environment specific variables.
    address internal axelarMessenger;
    address internal chainlinkMessenger;
    address internal hyperlaneMessenger;

    // Deploy addresses.
    Beacon internal beacon;

    // Deployer key.
    uint256 internal deployerKey;

    constructor() {}

    function setup() internal {
        deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // Deploy with key.
        vm.startBroadcast(deployerKey);

        // Deploy messengers.
        // 1. gateway, 2. gasReceiver
        axelarMessenger = address(new AxelarMessenger(address(0), address(0)));
        // 1. router, 2. link
        chainlinkMessenger = address(new ChainlinkMessenger(address(0), address(0)));
        // 1. Mailbox, 2. interchain gas paymaster
        hyperlaneMessenger = address(new HyperlaneMessenger(address(0), address(0)));

        // Deploy Beacon implementation.
        beacon = new Beacon(axelarMessenger, chainlinkMessenger, hyperlaneMessenger);

        vm.stopBroadcast();
    }
}
