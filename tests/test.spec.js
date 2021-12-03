import chai from 'chai';
const assert = require('assert');

const a = () => true;

describe('test mocha', () => {
  it('test to see if mocha works', async () => {
    assert.strictEqual(a(), true);
  });
});
