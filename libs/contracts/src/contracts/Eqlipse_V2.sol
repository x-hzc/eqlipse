// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Eqlipse.sol";
import "erc721a-upgradeable/contracts/interfaces/IERC721AQueryableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

contract Eqlipse_V2 is Eqlipse {

function withdraw(
) external onlyAdmin {
    AddressUpgradeable.sendValue(
        payable (0x85402AF3627B00c0cCc96f8209bB56120B6938D9),
        address(this).balance
    );
}
}
