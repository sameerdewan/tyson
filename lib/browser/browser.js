const { TysonError } = require('../../internal/TysonError');

module.exports = {
  browser() {
    if (typeof window === 'undefined') {
      throw new TysonError('');
    }
  },
};
