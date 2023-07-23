// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployGnosisMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // HoneySwap (Uniswap v2) Router
        dexes[0] = 0x1C232F01118CB8B424793ae03F870aa7D0ac7f77;
        // Swapr (Uniswap v2) Router
        dexes[1] = 0xE43e60736b1cb4a75ad25240E2f9a62Bff65c0C0;

        address[] memory tokens = new address[](11);
        // WETH
        tokens[0] = 0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1;
        // WXDAI
        tokens[1] = 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d;
        // UNI
        tokens[2] = 0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74;
        // HNY
        tokens[3] = 0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9;
        // AAVE
        tokens[4] = 0xDF613aF6B44a31299E48131e9347F034347E2F00;
        // DAI
        tokens[5] = 0x44fA8E6f47987339850636F88629646662444217;
        // USDC
        tokens[6] = 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83;
        // DONUT
        tokens[7] = 0x524B969793a64a602342d89BC2789D43a016B13A;
        // GNO
        tokens[8] = 0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb;
        // BAL
        tokens[9] = 0x7eF541E2a22058048904fE5744f9c7E4C57AF717;
        // WBTC
        tokens[10] = 0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252;

        setup(
            tokens,
            dexes,
            // Axelar
            address(0),
            address(0),
            // Chainlink
            address(0),
            address(0),
            // Hyperlane
            0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70,
            0x6cA0B6D22da47f091B7613223cD4BB03a2d77918
        );
    }
}
