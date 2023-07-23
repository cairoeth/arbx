// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployAvalancheMainnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // Trader Joe (Uniswap v2) Router
        dexes[0] = 0x60aE616a2155Ee3d9A68541Ba4544862310933d4;
        // Pangolin Router
        dexes[1] = 0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106;

        address[] memory tokens = new address[](13);
        // PNG
        tokens[0] = 0x60781C2586D68229fde47564546784ab3fACA982;
        // ETH
        tokens[1] = 0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB;
        // USDC.e
        tokens[2] = 0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664;
        // WAVAX
        tokens[3] = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;
        // PRMD
        tokens[4] = 0x74c2A8a0161FF501d44A71C2E2dFDB5485912B1F;
        // SPELL
        tokens[5] = 0xCE1bFFBD5374Dac86a2893119683F4911a2F7814;
        // COOK
        tokens[6] = 0x637afeff75ca669fF92e4570B14D6399A658902f;
        // HEC
        tokens[7] = 0xC7f4debC8072e23fe9259A5C0398326d8EfB7f5c;
        // KLO
        tokens[8] = 0xb27c8941a7Df8958A1778c0259f76D1F8B711C35;
        // LINK.e
        tokens[9] = 0x5947BB275c521040051D82396192181b413227A3;
        // NCASH
        tokens[10] = 0xc69Eba65e87889f0805dB717Af06797055A0BA07;
        // LOS
        tokens[11] = 0x449674B82F05d498E126Dd6615a1057A9c088f2C;
        // HCT
        tokens[12] = 0x45C13620B55C35A5f539d26E88247011Eb10fDbd;

        setup(
            tokens,
            dexes,
            // Axelar
            0x5029C0EFf6C34351a0CEc334542cDb22c7928f78,
            0x2d5d7d31F671F86C782533cc367F14109a082712,
            // Chainlink
            0x27F39D0af3303703750D4001fCc1844c6491563c,
            0x5947BB275c521040051D82396192181b413227A3,
            // Hyperlane
            0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70,
            0x6cA0B6D22da47f091B7613223cD4BB03a2d77918
        );
    }
}
