import { ethers, upgrades } from 'hardhat';
import { stageOne, stageTwo, stageThree } from '@mint-page/whitelist-addresses';
import {
  buildMerkleClaimTree,
  buildMerkleTree,
} from '@chocolate-factory/merkle';

async function main() {
  const Contract = await ethers.getContractAt(
    'Eqlipse',
    '0x61c20bc3d6d5c370f6e7a816e45e27feaac7bd3d'
  );

  const phaseOne = buildMerkleTree(stageOne);
  const phaseTwo = buildMerkleTree(stageTwo);
  const phaseThree = buildMerkleTree(stageThree);

  let tx = await Contract.updateMerkleTreeRoot(2, phaseOne.getHexRoot());

  await tx.wait();

  let tx2 = await Contract.updateMerkleTreeRoot(3, phaseTwo.getHexRoot());
  await tx2.wait();

  let tx3 = await Contract.updateMerkleTreeRoot(4, phaseThree.getHexRoot());
  await tx3.wait();

  console.log('Done!');

  console.log(phaseOne.getHexRoot(), await Contract.merkleTreeRoot(2));
  console.log(phaseTwo.getHexRoot(), await Contract.merkleTreeRoot(3));
  console.log(phaseThree.getHexRoot(), await Contract.merkleTreeRoot(4));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
