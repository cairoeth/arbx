// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployCeloMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // Uniswap v3 Router
        dexes[0] = 0x5615CDAb10dc425a742d643d949a7F474C01abc4;
        // Ubeswap (Uniswap v2) Router
        dexes[1] = 0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121;

        address[] memory tokens = new address[](9);
        // CELO
        tokens[0] = 0x471EcE3750Da237f93B8E339c536989b8978a438;
        // cUSD
        tokens[1] = 0x765DE816845861e75A25fCA122bb6898B8B1282a;
        // WETH
        tokens[2] = 0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207;
        // USDC
        tokens[3] = 0x37f750B7cC259A2f741AF45294f6a16572CF5cAd;
        // cEUR
        tokens[4] = 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73;
        // ETHIX
        tokens[5] = 0x9995cc8F20Db5896943Afc8eE0ba463259c931ed;
        // mCUSD
        tokens[6] = 0x918146359264C492BD6934071c6Bd31C854EDBc3;
        // SOL
        tokens[7] = 0x173234922eB27d5138c5e481be9dF5261fAeD450;
        // PACT
        tokens[8] = 0x46c9757C5497c5B1f2eb73aE79b6B67D119B0B58;

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
