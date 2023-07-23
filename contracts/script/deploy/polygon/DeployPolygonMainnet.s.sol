// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployPolygonMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](6);
        // QuickSwap Router
        dexes[0] = 0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff;
        // SushiSwap Router
        dexes[1] = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
        // ApeSwap Router
        dexes[2] = 0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607;
        // MeshSwap
        dexes[3] = 0x10f4A785F458Bc144e3706575924889954946639;
        // Dfyn
        dexes[4] = 0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429;
        // Polycat
        dexes[5] = 0x8ceed93Cf1ad0A25fA7Dd7056CfAbae8722fe191;

        address[] memory tokens = new address[](10);
        // USDT
        tokens[0] = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;
        // WETH
        tokens[1] = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
        // MATIC
        tokens[2] = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
        // NITRO
        tokens[3] = 0x695FC8B80F344411F34bDbCb4E621aA69AdA384b;
        // USDC
        tokens[4] = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
        // POLI
        tokens[5] = 0x6fb54Ffe60386aC33b722be13d2549dd87BF63AF;
        // LFI
        tokens[6] = 0x77D97db5615dFE8a2D16b38EAa3f8f34524a0a74;
        // IUX
        tokens[7] = 0x346404079b3792a6c548B072B9C4DDdFb92948d5;
        // WNT
        tokens[8] = 0x82a0E6c02b91eC9f6ff943C0A933c03dBaa19689;
        // PGEN
        tokens[9] = 0x01d35cbC2070a3B76693Ce2b6364Eae24eb88591;

        setup(
            tokens,
            dexes,
            // Axelar
            0x6f015F16De9fC8791b234eF68D486d2bF203FBA8,
            0x2d5d7d31F671F86C782533cc367F14109a082712,
            // Chainlink
            0x3C3D92629A02a8D95D5CB9650fe49C3544f69B43,
            0xb0897686c545045aFc77CF20eC7A532E3120E0F1,
            // Hyperlane
            0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70,
            0x6cA0B6D22da47f091B7613223cD4BB03a2d77918
        );
    }
}
