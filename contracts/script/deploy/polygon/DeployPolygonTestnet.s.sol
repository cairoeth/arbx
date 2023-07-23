// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployPolygonTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // QuickSwap Router
        dexes[0] = 0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff;
        // SushiSwap Router
        dexes[1] = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;

        address[] memory tokens = new address[](6);
        // WMATIC
        tokens[0] = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
        // USDC
        tokens[1] = 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23;
        // WBTC
        tokens[2] = 0x97e8dE167322a3bCA28E8A49BC46F6Ce128FEC68;
        // USDC 2
        tokens[3] = 0xe9DcE89B076BA6107Bb64EF30678efec11939234;
        // USDC 3
        tokens[4] = 0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e;
        // USDC 4
        tokens[5] = 0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7;

        setup(
            tokens,
            dexes,
            // Axelar
            0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B,
            0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,
            // Chainlink
            0x70499c328e1E2a3c41108bd3730F6670a44595D1,
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            // Hyperlane
            0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a
        );
    }
}
