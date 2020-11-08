const { TysonError } = require('../../internal/TysonError');

module.exports = {
  call(fn, ...parameters) {
    if (typeof fn !== 'function') {
      throw new TysonError('First argument must be a function');
    }
    return () => {
      if (parameters) {
        return fn(...parameters);
      }
      return fn();
    };
  },
};
