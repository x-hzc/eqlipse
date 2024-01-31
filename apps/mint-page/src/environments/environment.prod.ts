import { ChainId } from '@usedapp/core';
import { ALCHEMY_ID, INFURA_ID } from './constants';

export const environment = {
  production: false,
  readOnlyChainId: ChainId.Mainnet,
  alchemyId: ALCHEMY_ID,
  tokenAddress: '0xB111fdE893e97959155A8Cb23ac19775eA84c638',
  apiURL: 'http://localhost:4300',
  infuraId: INFURA_ID,
  readOnlyUrls: {
    [ChainId.Mainnet]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  },
  walletConnectId: '5fcb4f5daedc913adf99ef548a3ce14e',
};
