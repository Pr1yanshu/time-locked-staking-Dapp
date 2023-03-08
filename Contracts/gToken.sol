// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GToken is ERC20 {
    constructor() ERC20("G Token", "GT") {
        _mint(msg.sender, 1000000000000 * 10**3);
    }
    function decimals() public view virtual override returns (uint8) {
        return 3;
    }
}