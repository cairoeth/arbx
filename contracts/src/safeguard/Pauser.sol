// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.20;

import "openzeppelin/security/Pausable.sol";
import "openzeppelin/access/Ownable.sol";

abstract contract Pauser is Ownable, Pausable {
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
