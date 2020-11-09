const { TysonError } = require('../../internal/TysonError');

module.exports = {
  asyncSequence(...fns) {
    fns.forEach((fn) => {
      const isObject = typeof fn === 'object' && fn !== null;
      const isFunction = typeof fn === 'function';
      if (isFunction) {
        return;
      }
      let isValidObject = false;
      if (isObject) {
        const { method, parser } = fn;
        if (method != null && method !== undefined && typeof method === 'function') {
          if (parser != null && parser !== undefined && typeof parser === 'function') {
            isValidObject = true;
          } else if (parser == null || parser === undefined) {
            isValidObject = true;
          }
        }
      }
      if (isValidObject) {
        return;
      }
      throw new TysonError('Not valid argument(s) passed into async sequence');
    });
    return {
      async run(arg) {
        let result = arg;
        // eslint-disable-next-line no-restricted-syntax
        for (const fn of fns) {
          const { method, parser } = fn;
          if (method != null && method !== undefined && typeof method === 'function') {
            if (parser != null && parser !== undefined && typeof parser === 'function') {
              // eslint-disable-next-line no-await-in-loop
              result = parser(await method(result));
            } else {
              // eslint-disable-next-line no-await-in-loop
              result = await method(result);
            }
          } else {
            // eslint-disable-next-line no-await-in-loop
            result = await fn(result);
          }
        }
        return result;
      },
    };
  },
};
