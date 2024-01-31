// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@chocolate-factory/contracts/token/ERC721/presets/MultiStageBase.sol";

contract Eqlipse is MultiStageBase {
 bool public isCollectionTransferable;

  function _startTokenId()
    internal
    pure
    override(ERC721AUpgradeable)
    returns (uint256)
  {
    return 1;
  }

  function initialize (Args memory args) public initializer {
    __Base_init(args);
     isCollectionTransferable = false;
  }

  function toggleTransfer() public onlyAdmin() {
    isCollectionTransferable = !isCollectionTransferable;
  }

   function _beforeTokenTransfers(address from, address to, uint256 startTokenId, uint256 quantity)
    internal
    override(ERC721AUpgradeable){
    if(from != address(0) && isCollectionTransferable == false) {
        revert("Eqlipse: Transfer Is Disabled");
    }
    super._beforeTokenTransfers(from, to, startTokenId, quantity);
  }

  modifier onlyAllowedOperator(address from) override(OperatorFiltererUpgradeable) {
      _;
  }
}
