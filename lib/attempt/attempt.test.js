const assert = require('assert');
const { attempt } = require('./attempt');
const { TysonError } = require('../../internal/TysonError');

describe('attempt', () => {
  function dummyFunction1(parameter1, parameter2, parameter3) {
    return parameter1 * parameter2 * parameter3;
  }
  function dummyFunction2() {
    throw new TysonError('Error thrown!');
  }
  describe('attempt > dummyFunctions', () => {
    it('dummyFunction1 should return the correct value', () => {
      const value = dummyFunction1(1, 2, 4);
      assert.strictEqual(value, 8);
    });
    it('dummyFunction2 should throw an error', () => {
      let errorDetected = false;
      try {
        dummyFunction2();
      } catch (error) {
        errorDetected = true;
      }
      assert.strictEqual(errorDetected, true);
    });
  });
  it('should require a function as the first argument', () => {
    let errorCaught = false;
    try {
      attempt();
    } catch (error) {
      errorCaught = true;
      assert.strictEqual(error.message, 'First argument must be a function');
    }
    assert.strictEqual(errorCaught, true, 'Expected to catch error when function was not passed in.');
  });
  it('should return a result on success of attempt', () => {
    const { result } = attempt(dummyFunction1, 5, 5, 3);
    assert.strictEqual(result, 75);
  });
  it('should return an error on error of attempt', () => {
    const { error } = attempt(dummyFunction2);
    assert.strictEqual(error.message, 'Error thrown!');
  });
});
