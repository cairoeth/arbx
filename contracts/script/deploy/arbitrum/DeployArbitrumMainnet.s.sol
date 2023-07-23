// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployArbitrumMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // Uniswap v3 Router
        dexes[0] = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
        // Sushiswap
        dexes[1] = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;

        address[] memory tokens = new address[](8);
        // WETH
        tokens[0] = 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1;
        // USDC.e
        tokens[1] = 0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8;
        // ARB
        tokens[2] = 0x912CE59144191C1204E64559FE8253a0e49E6548;
        // USDT
        tokens[3] = 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9;
        // STG
        tokens[4] = 0x6694340fc020c5E6B96567843da2df01b2CE1eb6;
        // DODO
        tokens[5] = 0x69Eb4FA4a2fbd498C257C57Ea8b7655a2559A581;
        // MTG
        tokens[6] = 0x748b5BE12ac1Ce2EF73035189F943591C1822B7d;
        // PENDLE
        tokens[7] = 0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8;

        setup(
            tokens,
            dexes,
            // Axelar
            0xe432150cce91c13a887f7D836923d5597adD8E31,
            0x2d5d7d31F671F86C782533cc367F14109a082712,
            // Chainlink
            address(0),
            address(0),
            // Hyperlane
            0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70,
            0x6cA0B6D22da47f091B7613223cD4BB03a2d77918
        );
    }
}
