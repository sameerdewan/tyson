const assert = require('assert');
const { asyncSequence } = require('./asyncSequence');

describe('asyncSequence', () => {
  function dummyFunction1(arg) {
    return new Promise((resolve) => setTimeout(() => resolve(arg * 2), 250));
  }
  function dummyFunction2(arg) {
    return new Promise((resolve) => setTimeout(() => resolve(arg + 5), 250));
  }
  function dummyFunction3(arg) {
    return new Promise((resolve) => setTimeout(() => resolve(arg + arg), 250));
  }
  describe('asyncSequence > dummyFunctions', () => {
    it('dummyFunction1 should return the argument times 2', async () => {
      const value = await dummyFunction1(5);
      assert.strictEqual(value, 10);
    });
    it('dummyFunction2 should return the argument plus 5', async () => {
      const value = await dummyFunction2(1);
      assert.strictEqual(value, 6);
    });
    it('dummyFunction3 should return the argument plus itself', async () => {
      const value = await dummyFunction3(9);
      assert.strictEqual(value, 18);
    });
  });
  it('should throw an error if any of the arguments are not functions', () => {
    let errorCaught = false;
    try {
      asyncSequence(dummyFunction1, dummyFunction2, 6, dummyFunction3);
    } catch (error) {
      errorCaught = true;
      assert.strictEqual(error.message, 'Not a function');
    }
    assert.strictEqual(errorCaught, true);
  });
  it('should return a run function', () => {
    const pipeline = asyncSequence(dummyFunction1, dummyFunction2, dummyFunction3);
    assert.strictEqual(typeof pipeline.run, 'function');
  });
  it('should fire run and return the correct value', async () => {
    const initialValue = 3;
    const pipeline = asyncSequence(dummyFunction1, dummyFunction2, dummyFunction3);
    const value = await pipeline.run(initialValue);
    assert.strictEqual(value, 22);
  });
});
