const assert = require('assert');
const { call } = require('./call'); 

describe('Call', () => {
    it('should require a function as the first argument', () => {
        let errorCaught = false;
        try {
            call();
        } catch(error) {
            errorCaught = true;
            assert.strictEqual(error.message, 'First argument must be a function');
        }
        assert.strictEqual(errorCaught, true, 'Expected to catch error when function was not passed in.');
    });
    it('should return a function', () => {
        const testFn = call(console.log);
        assert.strictEqual(typeof testFn, 'function');
    });
    it('the callable function should run correctly with arguments', () => {
        function dummyFunction(parameter1, parameter2, parameter3) {
            return parameter1 + parameter2 + parameter3;
        }
        describe('Call > DummyFunction', () => {
            it('should return the correct value', () => {
                const value = dummyFunction(1, 2, 3);
                assert.strictEqual(value, 6);
            });
        });
        const testFn = call(dummyFunction, 2, 4, 6);
        const value = testFn();
        assert.strictEqual(value, 12);
    });
});