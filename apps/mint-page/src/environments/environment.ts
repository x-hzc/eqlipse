import { ChainId } from '@usedapp/core';
import { ALCHEMY_ID, INFURA_ID } from './constants';

export const environment = {
  production: false,
  readOnlyChainId: ChainId.Goerli,
  alchemyId: ALCHEMY_ID,
  tokenAddress: '0x61C20Bc3d6D5C370F6e7a816E45E27FeAAc7Bd3D',
  apiURL: 'http://localhost:4300',
  infuraId: INFURA_ID,
  readOnlyUrls: {
    [ChainId.Goerli]: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ID}`,
  },
  walletConnectId: '5fcb4f5daedc913adf99ef548a3ce14e',
};
