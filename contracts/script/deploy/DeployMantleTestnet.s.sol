// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {DeployBase} from "./DeployBase.s.sol";

contract DeployMantleTestnet is DeployBase {
    constructor() DeployBase() {}

    function run() external {
        setup();
    }
}
