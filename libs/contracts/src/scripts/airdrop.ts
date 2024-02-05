import { ethers } from 'hardhat';

async function main() {
  const addresses = [
    '0xdAde4144A25da656ffd50cAf4842e72826643aB8',
    '0xcFaBb93BA93e8cFebc0095eBe88158ada59dcf06',
    '0x6DC142DC98820DC6EEb6d39369bb4F99Af04fd9D',
    '0x908d7750B2e45D0fDf1c663058404E49f6d35AD1',
    '0x9f2626209a2b655D2732Efe616f4e9b1F967Fb5a',
    '0x5395e455642C0f9D8631E45DD0809f93b93eCF2B',
    '0x170FF879349558Bb4b1123525e7921Ac053a6E78',
    '0xfDf46e603fb742FA9B459326D5B39A1C33cb65f0',
    '0x58f8776c643411733e70e3BeC37aF0b697A1A109',
    '0xb98603C91f4c8Dd7706F6898631f4908912B5dA3',
    '0x231ed33e9da3E790BDA2F780D1645B9782aCe48a',
    '0xbc15DAD6f8325701502A10FF1919cD13981098c2',
    '0x5F42932C20e26052dF4799Bb93FDFcfF08346337',
    '0x2ff1fc52072EfC0568E29C45908A01BB49D7e98C',
    '0x6459F2A2968E974ff36Ec6781924e4103D0922a8',
    '0xc6196B648d808b7714F824624acE42C9ECC27512',
    '0xDB1Ac1d3CaCF1bB80e3597bb0EE3CAF52D266dFa',
    '0xAFeeEc338f4291b23D8C1Bd3f415b9B5398E0057',
    '0xb866454dB28A52190510187c68594c6638aB80f7',
    '0x1349FbB566900eBaB17348b73a8Cfb8f69C2ef9B',
    '0x9e74a7E9B95aAa48D1f09537A869bB240e176D48',
    '0x13dC3217ea930BcF7D2Ac9cAdCb4d4F54cfd97AE',
    '0x4acC110349e36c23d2A6AB9F6A0a3008a2b50F49',
    '0xD1E2Fec054B84a7f501818C7849817dD3065610d',
    '0x198E92a3D9c6BC66AdF79780E60AF444fb83096d',
    '0x5CBa11354f3455512450D19D432bD24Cb66d5338',
    '0xF13dF1db2b9ad7E50bE4C7d8aE5350D6e5721b74',
  ];

  const amounts = new Array(addresses.length).fill(1);

  const contractName = 'Eqlipse';
  const contractAddress = '0xB111fdE893e97959155A8Cb23ac19775eA84c638';
  const seizon = await ethers.getContractAt(contractName, contractAddress);

  const txn = await seizon.adminMint(addresses, amounts);

  const receipt = await txn.wait();
  console.log(`Transaction mined in block #${receipt.blockNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
