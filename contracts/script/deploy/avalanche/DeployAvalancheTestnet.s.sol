// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployAvalancheTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](4);
        // Trader Joe Router 2.1
        dexes[0] = 0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30;
        // Trader Joe Router 2.0
        dexes[1] = 0x7b50046cEC8252ca835b148b1eDD997319120a12;
        // Trader Joe Router 1.0
        dexes[2] = 0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901;
        // Pangolin Router
        dexes[3] = 0x2D99ABD9008Dc933ff5c0CD271B88309593aB921;

        address[] memory tokens = new address[](5);
        // aUSDC
        tokens[0] = 0x57F1c63497AEe0bE305B8852b354CEc793da43bB;
        // WAVAX
        tokens[1] = 0xd00ae08403B9bbb9124bB305C09058E32C39A48c;
        // AXIAL
        tokens[2] = 0x57b8a194230ef402584130B1eD31d2C4682d7a71;
        // SNOB
        tokens[3] = 0xF319e2f610462F846d6e93F51CdC862EEFF2a554;
        // LINK
        tokens[4] = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;

        setup(
            tokens,
            dexes,
            // Axelar
            0xC249632c2D40b9001FE907806902f63038B737Ab,
            0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,
            // Chainlink
            0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8,
            0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846,
            // Hyperlane
            0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a
        );
    }
}
