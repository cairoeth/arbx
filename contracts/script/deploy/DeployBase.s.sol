// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Beacon} from "../../src/Beacon.sol";

abstract contract DeployBase is Script {
    // TODO: Environment specific variables.

    // Deploy addresses.
    Beacon internal beacon;

    // Deployer key.
    uint256 internal deployerKey;

    constructor() {}

    function setup() internal {
        deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // Deploy with key.
        vm.startBroadcast(deployerKey);

        // Deploy Beacon implementation.
        beacon = new Beacon();

        vm.stopBroadcast();
    }
}
