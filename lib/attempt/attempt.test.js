const assert = require('assert');
const { attempt } = require('./attempt');

describe('Attempt', () => {
    it('should require a function as the first argument', () => {
        let errorCaught = false;
        try {
            attempt();
        } catch(error) {
            errorCaught = true;
            assert.strictEqual(error.message, 'First argument must be a function');
        }
        assert.strictEqual(errorCaught, true, 'Expected to catch error when function was not passed in.');
    });
});