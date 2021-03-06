const { TysonError } = require('../../internal/TysonError');

module.exports = {
  chunk(array = [], size = 1) {
    if (!Array.isArray(array)) {
      throw new TysonError('Invalid first argument, should be array');
    }
    if (typeof size !== 'number') {
      // eslint-disable-next-line no-param-reassign
      size = Number(size);
      if (Number.isNaN(size)) {
        throw new TysonError('NaN');
      }
    }
    if (!array.length) {
      return array;
    }
    let index = 0;
    let resultIndex = 0;
    const result = new Array(Math.ceil(array.length / size));

    while (index < array.length) {
      result[resultIndex] = array.slice(index, index += size);
      resultIndex += 1;
    }

    return result;
  },
};
