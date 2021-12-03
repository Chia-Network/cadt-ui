import { expect } from 'chai';

const a = () => true;

describe('test mocha', () => {
  it('test to see if mocha works', async () => {
    expect(a()).to.be.true;
  });
});
