import { ChainId } from '@usedapp/core';
import { ALCHEMY_ID, INFURA_ID } from './constants';

export const environment = {
  production: false,
  readOnlyChainId: ChainId.Goerli,
  alchemyId: ALCHEMY_ID,
  tokenAddress: '0x24ff6fa7b3490b9262dc6a28e9dcc94c4456505f',
  apiURL: 'http://localhost:4300',
  infuraId: INFURA_ID,
  readOnlyUrls: {
    [ChainId.Goerli]: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ID}`,
  },
};
