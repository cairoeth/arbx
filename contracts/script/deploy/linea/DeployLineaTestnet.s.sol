// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployLineaTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // HorizonDEX (Uniswap v3) Router
        dexes[0] = 0x31A72FB172f2139F1f77702A5CE85DC1E745E783;
        // SyncSwap Router
        dexes[1] = 0x80e38291e06339d10AAB483C65695D004dBD5C69;

        address[] memory tokens = new address[](4);
        // DAI
        tokens[0] = 0x8741Ba6225A6BF91f9D73531A98A89807857a2B3;
        // WETH
        tokens[1] = 0x2C1b868d6596a18e32E61B901E4060C872647b6C;
        // USDT
        tokens[2] = 0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73;
        // USDC
        tokens[3] = 0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068;

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
            address(0),
            address(0)
        );
    }
}
