import { whitelistAddresses } from './whitelist-addresses';

describe('whitelistAddresses', () => {
  it('should work', () => {
    expect(whitelistAddresses()).toEqual('whitelist-addresses');
  });
});
