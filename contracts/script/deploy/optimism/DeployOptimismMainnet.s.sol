// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployOptimismMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // Uniswap v3 Router
        dexes[0] = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
        // ZipSwap (Uniswap v2) Router
        dexes[1] = 0xE6Df0BB08e5A97b40B21950a0A51b94c4DbA0Ff6;

        address[] memory tokens = new address[](9);
        // USDC
        tokens[0] = 0x7F5c764cBc14f9669B88837ca1490cCa17c31607;
        // WETH
        tokens[1] = 0x4200000000000000000000000000000000000006;
        // OP
        tokens[2] = 0x4200000000000000000000000000000000000042;
        // USDT
        tokens[3] = 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58;
        // SNX
        tokens[4] = 0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4;
        // WBTC
        tokens[5] = 0x68f180fcCe6836688e9084f035309E29Bf0A2095;
        // UNI
        tokens[6] = 0x6fd9d7AD17242c41f7131d257212c54A0e816691;
        // agEUR
        tokens[7] = 0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED;
        // LINK
        tokens[8] = 0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6;

        setup(
            tokens,
            dexes,
            // Axelar
            0xe432150cce91c13a887f7D836923d5597adD8E31,
            0x2d5d7d31F671F86C782533cc367F14109a082712,
            // Chainlink
            0x261c05167db67B2b619f9d312e0753f3721ad6E8,
            0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6,
            // Hyperlane
            0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70,
            0x6cA0B6D22da47f091B7613223cD4BB03a2d77918
        );
    }
}
