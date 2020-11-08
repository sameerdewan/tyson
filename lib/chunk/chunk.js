const { TysonError } = require('../../internal/TysonError');

module.exports = {
  chunk(array = [], size = 1) {
    if (!Array.isArray(array)) {
      throw new TysonError('Invalid first argument, should be array');
    }
    if (typeof size !== 'number') {
      try {
        // eslint-disable-next-line no-param-reassign
        size = Math.max(Number(size), 0);
      } catch (error) {
        throw new TysonError('NaN');
      }
    }
    if (!array.length) {
      return array;
    }
  },
};
