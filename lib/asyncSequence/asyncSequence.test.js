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
  function dummyFunction4(arg) {
    return arg - 2;
  }
  function dummyParser1(arg) {
    return arg * 2;
  }
  function dummyParser2(arg) {
    return arg * 3;
  }
  describe('asyncSequence > dummyFunctions and dummyParsers', () => {
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
    it('dummyFunction4 should return the argument minus 2', () => {
      const value = dummyFunction4(5);
      assert.strictEqual(value, 3);
    });
    it('dummyParser1 should return the correct parsed value', () => {
      const value = dummyParser1(25);
      assert.strictEqual(value, 50);
    });
    it('dummyParser2 should return the correct parsed value', () => {
      const value = dummyParser2(50);
      assert.strictEqual(value, 150);
    });
    it('dummyParser1 and dummyParser2 in conjunction should return the correct parsed value', () => {
      const value = dummyParser2(dummyParser1(5));
      assert.strictEqual(value, 30);
    });
  });
  it('should throw an error if any of the arguments are not functions', () => {
    let errorCaught = false;
    try {
      asyncSequence(dummyFunction1, dummyFunction2, 6, dummyFunction3);
    } catch (error) {
      errorCaught = true;
      assert.strictEqual(error.message, 'Not valid argument(s) passed into async sequence');
    }
    assert.strictEqual(errorCaught, true);
  });
  it('should return a run function', () => {
    const pipeline = asyncSequence(dummyFunction1, dummyFunction2, dummyFunction3);
    assert.strictEqual(typeof pipeline.run, 'function');
  });
  it('should fire run and return the correct value', async () => {
    const initialValue = 3;
    const pipeline = asyncSequence(dummyFunction1, dummyFunction2, dummyFunction3, dummyFunction4);
    const value = await pipeline.run(initialValue);
    assert.strictEqual(value, 20);
  });
  it('should throw fire run and return the correct value given the { method, parser } syntax', async () => {
    const initialValue = 5;
    const pipeline = asyncSequence(
      { method: dummyFunction1, parser: dummyParser1 },
      dummyFunction2,
      dummyFunction3,
      { method: dummyFunction4, parser: dummyParser2 },
    );
    const value = await pipeline.run(initialValue);
    assert.strictEqual(value, 144);
  });
});
