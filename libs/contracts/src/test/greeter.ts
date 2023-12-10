import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Greeter } from '../typechain-types';

describe('Greeter', function () {
  let greeter: Greeter;

  beforeEach(async () => {
    const Greeter = await ethers.getContractFactory('Greeter');
    greeter = await Greeter.deploy();
  });

  it('should greet', async () => {
    expect(await greeter.greet()).to.equal('Hi!');
  });
});
