// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployGnosisMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](1);
        // HoneySwap (Uniswap v2) Router
        dexes[0] = 0x1C232F01118CB8B424793ae03F870aa7D0ac7f77;
        // Swapr (Uniswap v2) Router
        dexes[1] = 0xE43e60736b1cb4a75ad25240E2f9a62Bff65c0C0;

        address[] memory tokens = new address[](16);
        tokens[0] = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // DAI
        tokens[1] = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599; // WBTC
        tokens[2] = 0x514910771AF9Ca656af840dff83E8264EcF986CA; // LINK
        tokens[3] = 0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e; // YFI
        tokens[4] = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984; // UNI
        tokens[5] = 0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9; // AAVE
        tokens[6] = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF; // BAT
        tokens[7] = 0x6B3595068778DD592e39A122f4f5a5cF09C90fE2; // SUSHI
        tokens[8] = 0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44; // KP3R
        tokens[9] = 0x0F5D2fB29fb7d3CFeE444a200298f468908cC942; // MANA
        tokens[10] = 0x0F83287FF768D1c1e17a42F44d644D7F22e8ee1d; // REN
        tokens[11] = 0x408e41876cCCDC0F92210600ef50372656052a38; // RENBTC
        tokens[12] = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF; // BAT
        tokens[13] = 0x0F5D2fB29fb7d3CFeE444a200298f468908cC942; // MANA
        tokens[14] = 0x408e41876cCCDC0F92210600ef50372656052a38; // RENBTC
        tokens[15] = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF; // BAT

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
