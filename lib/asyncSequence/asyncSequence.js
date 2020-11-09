const { TysonError } = require('../../internal/TysonError');

module.exports = {
  asyncSequence(...fns) {
    fns.forEach((fn) => {
      if (typeof fn !== 'function') {
        const isObject = (value) => typeof value === 'object' && !!value;
        const isValid = fns.filter((funcObj) => {
          const funcIsObj = isObject(funcObj);
          if (!funcIsObj) {
            return false;
          }
          const { method, parser } = funcIsObj;
          if (method == null || method === undefined || typeof method !== 'function') {
            return false;
          }
          if (parser != null && parser !== undefined && typeof parser !== 'function') {
            return false;
          }
          return true;
        }).length > 0;
        if (!isValid) {
          throw new TysonError('Not valid argument(s) passed into async sequence');
        }
      }
    });
    return {
      async run(arg) {
        let result = arg;
        // eslint-disable-next-line no-restricted-syntax
        for (const fn of fns) {
          const { parser } = fn;
          if (parser) {
            // eslint-disable-next-line no-await-in-loop
            result = parser(await fn(result));
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
