import { ethers, upgrades } from 'hardhat';

async function main() {
  const factory = 'Eqlipse_V2';
  const address = '0xB111fdE893e97959155A8Cb23ac19775eA84c638';

  const Mag = await ethers.getContractFactory(factory);
  const mag = await upgrades.upgradeProxy(address, Mag);

  console.log('DFAKYV2: ', mag.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// import { ethers, upgrades } from 'hardhat';

// async function main() {
//   const factory = 'DFAStaking_V2';
//   const proxyAddress = '0x762496b254ee433291b7f5de92351c2f1fc50e78';

//   // Manually import the proxy if it's not recognized
//   const OriginalFactory = await ethers.getContractFactory('DFAStaking');
//   await upgrades.forceImport(proxyAddress, OriginalFactory);

//   const NewFactory = await ethers.getContractFactory(factory);
//   const upgradedContract = await upgrades.upgradeProxy(
//     proxyAddress,
//     NewFactory
//   );

//   console.log('Upgraded Contract Address: ', upgradedContract.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
