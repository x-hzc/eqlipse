import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const IMPLEMENTATION = 'Eqlipse';
  const args: unknown[] = [
    {
      payees: [
        '0xA88429716CDcC4daD9C6B51418452d053aB21654',
        '0xab7DDe540d93219906CC431cCA83723611312823',
        '0x9cCA6ed9d4aEaaB4E4DfB8709760aF35B1595386',
        '0xb98603C91f4c8Dd7706F6898631f4908912B5dA3',
        '0xccE01C00E6E80aA826f3F0eCCE0b23848eA5d244',
        '0x5395e455642c0f9d8631e45dd0809f93b93ecf2b',
        '0x2ff1fc52072EfC0568E29C45908A01BB49D7e98C',
        '0x6459F2A2968E974ff36Ec6781924e4103D0922a8',
        '0x76B9FB7c1559575d37Be4491e859B09ca4A4E58A',
        '0x9e74a7E9B95aAa48D1f09537A869bB240e176D48',
        '0x2C8a40e48c31C167664f71d5235e7E67E9696407',
      ],
      shares: [250, 250, 250, 500, 1000, 500, 125, 125, 125, 125, 6500],
      royaltiesRecipient: '0x2C8a40e48c31C167664f71d5235e7E67E9696407',
      royaltyValue: 100,
      stages: [
        {
          limit: 2,
          price: ethers.utils.parseEther('0.085'),
          merkleTreeRoot: ethers.constants.HashZero,
        },
        {
          limit: 1,
          price: ethers.utils.parseEther('0.1'),
          merkleTreeRoot: ethers.constants.HashZero,
        },
        {
          limit: 1,
          price: ethers.utils.parseEther('0.1'),
          merkleTreeRoot: ethers.constants.HashZero,
        },
      ],

      tokenConfig: {
        name: 'Eqlipse',
        symbol: 'EQLIPSE',
        supply: 500,
        prefix: '',
        suffix: '.json',
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
