import { ChainId } from '@usedapp/core';
import { ALCHEMY_ID, INFURA_ID } from './constants';

export const environment = {
  production: false,
  readOnlyChainId: ChainId.Mainnet,
  alchemyId: ALCHEMY_ID,
  infuraId: INFURA_ID,
  readOnlyUrls: {
    [ChainId.Mainnet]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  },
};
