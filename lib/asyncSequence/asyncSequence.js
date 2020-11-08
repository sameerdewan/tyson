const { TysonError } = require('../../internal/TysonError');

module.exports = {
  asyncSequence(...fns) {
    fns.forEach((fn) => {
      if (typeof fn !== 'function') {
        throw new TysonError('Not a function');
      }
    });
    return {
      async run(arg) {
        let result = arg;
        // eslint-disable-next-line no-restricted-syntax
        for (const fn of fns) {
          result = fn(result);
          if (result instanceof Promise) {
            // eslint-disable-next-line no-await-in-loop
            await result;
          }
        }
        return result;
      },
    };
  },
};
