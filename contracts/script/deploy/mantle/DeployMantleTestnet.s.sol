// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {Deploy} from "../Deploy.s.sol";

contract DeployMantleTestnet is Deploy {
    constructor() Deploy() {}

    function run() external {
        address[] memory dexes = new address[](2);
        // FusionX (Uniswap v2) Router
        dexes[0] = 0x45e6f621c5ED8616cCFB9bBaeBAcF9638aBB0033;
        // FusionX (Uniswap v3) Router
        dexes[1] = 0x8fC0B6585d73C94575555B3970D7A79c5bfc6E36;

        address[] memory tokens = new address[](5);
        // MUST
        tokens[0] = 0xa9b72cCC9968aFeC98A96239B5AA48d828e8D827;
        // MUSDC
        tokens[1] = 0xc92747b1e4Bd5F89BBB66bAE657268a5F4c4850C;
        // WBIT
        tokens[2] = 0x8734110e5e1dcF439c7F549db740E546fea82d66;
        // DAI
        tokens[3] = 0xB38E748dbCe79849b8298A1D206C8374EFc16DA7;
        // FSX
        tokens[4] = 0x6dFB16bc471982f19DB32DEE9b6Fb40Db4503cBF;

        setup(
            tokens,
            dexes,
            // Axelar
            address(0),
            address(0),
            // Chainlink
            address(0),
            address(0),
            // TODO: Hyperlane
            address(0),
            address(0)
        );
    }
}
