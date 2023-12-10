// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@chocolate-factory/contracts/token/ERC721/presets/TwoStageBase.sol";

contract NFT is TwoStageBase {
  function initialize (Args memory args) internal initializer {
    __Base_init(args);
  }
}