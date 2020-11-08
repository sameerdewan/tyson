module.exports = {
  call(fn, ...parameters) {
    if (typeof fn !== 'function') {
      throw new Error('First argument must be a function');
    }
    return function () {
      if (parameters) {
        return fn(...parameters);
      }
      return fn();
    };
  },
};
