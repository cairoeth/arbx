// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployCeloTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](1);
        // Ubeswap (Uniswap v2) Router
        dexes[0] = 0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121;

        address[] memory tokens = new address[](18);
        // POOF
        tokens[0] = 0x00400FcbF0816bebB94654259de7273f4A05c762;
        // mcEUR
        tokens[1] = 0x0D9B4311657003251d1eFa085e74f761185F271c;
        // cEUR
        tokens[2] = 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F;
        // NTMX
        tokens[3] = 0x123ED050805E0998EBEf43671327139224218e50;
        // MOO
        tokens[4] = 0x17700282592D6917F6A73D0bF8AcCf4D578c131e;
        // mcEURxOLD
        tokens[5] = 0x32974C7335e649932b5766c5aE15595aFC269160;
        // mcUSD
        tokens[6] = 0x3a0EA4e0806805527C750AB9b34382642448468D;
        // mcREAL
        tokens[7] = 0x3D0EDA535ca4b15c739D46761d24E42e37664Ad7;
        // ETHIX
        tokens[8] = 0x4620D7a5F58f77eeE69A38AfdAa8f2FfB10b42b6;
        // MZPN
        tokens[9] = 0x4d8BF8347600f5207bfdad57363fBa802C9C2031;
        // mCELO
        tokens[10] = 0x653cC2Cc0Be398614BAd5d5328336dc79281e246;
        // mcUSDxOLD
        tokens[11] = 0x71DB38719f9113A36e14F409bAD4F07B58b4730b;
        // mCELOxOLD
        tokens[12] = 0x86f61EB83e10e914fc6F321F5dD3c2dD4860a003;
        // cUSD
        tokens[13] = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
        // sCELO
        tokens[14] = 0xb9B532e99DfEeb0ffB4D3EDB499f09375CF9Bf07;
        // rCELO
        tokens[15] = 0xBDeedCDA79BAbc4Eb509aB689895a3054461691e;
        // CELO
        tokens[16] = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
        // NCT
        tokens[17] = 0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5;

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
