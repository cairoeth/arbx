// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import 'forge-std/Script.sol';
import {Deploy} from '../Deploy.s.sol';

contract DeployGoerliTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        setup();
    }
}
