const assert = require('assert');
const { attempt } = require('./attempt');

describe('Attempt', () => {
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
    function dummyFunction(parameter1, parameter2, parameter3) {
      return parameter1 * parameter2 * parameter3;
    }
    describe('Attempt > should return a result on success of attempt > dummyFunction', () => {
      it('should return the correct value', () => {
        const value = dummyFunction(1, 2, 4);
        assert.strictEqual(value, 8);
      });
    });
    const { result } = attempt(dummyFunction, 5, 5, 3);
    assert.strictEqual(result, 75);
  });
  it('should return an error on error of attempt', () => {
    function dummyFunction() {
      throw new Error('Error thrown!');
    }
    describe('Attempt > should return an error on error of attempt > dummyFunction', () => {
      it('should throw an error', () => {
        let errorDetected = false;
        try {
          dummyFunction();
        } catch (error) {
          errorDetected = true;
        }
        assert.strictEqual(errorDetected, true);
      });
    });
    const { error } = attempt(dummyFunction);
    assert.strictEqual(error.message, 'Error thrown!');
  });
});
