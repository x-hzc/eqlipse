//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract EPS is Initializable, PaymentSplitterUpgradeable {
    uint256 public payeesLength;

    function initialize(
        address[] memory payees,
        uint256[] memory shares_
    ) public initializer {
        __PaymentSplitter_init(payees, shares_);
        payeesLength = payees.length;
    }

    // function __CustomPaymentSplitter_init(
    //     address[] memory shareholders_,
    //     uint256[] memory shares_
    // ) public onlyInitializing {
    //     __PaymentSplitter_init(shareholders_, shares_);
    //     payeesLength = shareholders_.length;
    // }

    function releaseAll() external {
        for (uint256 i; i < payeesLength; ) {
            address toPay = payee(i);
            release(payable(toPay));
            unchecked {
                i++;
            }
        }
    }

    function releaseAll(IERC20Upgradeable token) external {
        for (uint256 i; i < payeesLength; ) {
            address toPay = payee(i);
            release(token, toPay);
            unchecked {
                i++;
            }
        }
    }

    uint256[49] private __gap;
}