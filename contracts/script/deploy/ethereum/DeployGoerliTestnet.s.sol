// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployGoerliTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // SushiSwap (Uniswap v2) Router
        dexes[0] = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
        // Uniswap v3 Router
        dexes[1] = 0xE592427A0AEce92De3Edee1F18E0157C05861564;

        address[] memory tokens = new address[](5);
        // WETH
        tokens[0] = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
        // DAI
        tokens[1] = 0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844;
        // UNI
        tokens[2] = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
        // USDC
        tokens[3] = 0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C;
        // METH
        tokens[4] = 0xdD69DB25F6D620A7baD3023c5d32761D353D3De9;

        setup(
            tokens,
            dexes,
            // Axelar
            0xe432150cce91c13a887f7D836923d5597adD8E31,
            0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,
            // Chainlink
            address(0),
            address(0),
            // Hyperlane
            0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a
        );
    }
}
