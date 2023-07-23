// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployArbitrumTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](1);
        // ArbSwap (Uniswa v2) Router
        dexes[0] = 0x81cD91B6BD7D275a7AeebBA15929AE0f0751d18C;

        address[] memory tokens = new address[](5);
        // WETH
        tokens[0] = 0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f;
        // GXY
        tokens[1] = 0x22D967F10eC4364Cb18974C59699b27a2038524C;
        // aUSDC
        tokens[2] = 0x254d06f33bDc5b8ee05b2ea472107E300226659A;
        // USDC
        tokens[3] = 0x8192dA45b932EFDc56dee24aC205d6Bcf209AA73;
        // ARBS
        tokens[4] = 0xbe737d08Fb505AD45e08a89Ac7FDA9791f025bF2;

        setup(
            tokens,
            dexes,
            // Axelar
            0xe432150cce91c13a887f7D836923d5597adD8E31,
            0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,
            // Chainlink
            0x88E492127709447A5ABEFdaB8788a15B4567589E,
            0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28,
            // Hyperlane
            0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a
        );
    }
}
