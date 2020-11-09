const { TysonError } = require('../../internal/TysonError');

module.exports = {
  common(param1, param2, ...parameters) {
    if (!Array.isArray(param1) || Array.isArray(param2)) {
      throw new TysonError('Invalid parameter provided to common');
    }
    parameters.forEach((parameter) => {
      const isArray = Array.isArray(parameter);
      if (!isArray) {
        throw new TysonError('Invalid parameter provided to common');
      }
    });
    return param2 === undefined ? param1 : this.common((_param1, _param2) => (
      _param1.filter((p1) => _param2.some((p2) => p2 === p1))
    ), ...parameters);
  },
};
