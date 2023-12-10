import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const IMPLEMENTATION = '';
  const args: unknown[] = [
    {
      payees: [],
      shares: [],
      royaltiesRecipient: '',
      royaltyValue: 100,
      stages: [
        {
          limit: 1,
          price: ethers.utils.parseEther('0.1'),
          merkleTreeRoot: ethers.constants.HashZero,
        },
      ],
      tokenConfig: {
        name: '',
        symbol: '',
        supply: 5000,
        prefix: '',
        suffix: '',
      },
    },
  ];
  const Contract = await ethers.getContractFactory(IMPLEMENTATION);
  const contract = await upgrades.deployProxy(Contract, args);
  await contract.deployed();
  console.log(contract.address, 'deployed');

  await run('verify:verify', {
    address: contract.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
