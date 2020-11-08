const { TysonError } = require('../../internal/TysonError');

module.exports = {
  attempt(fn, ...parameters) {
    if (typeof fn !== 'function') {
      throw new TysonError('First argument must be a function');
    }
    try {
      let result;
      if (parameters) {
        result = fn(...parameters);
      } else {
        result = fn();
      }
      return { result };
    } catch (error) {
      return { error };
    }
  },
};
