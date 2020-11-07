module.exports = {
    call: function (fn, ...parameters) {
        if (typeof fn !== 'function') {
            throw new Error('First argument must be a function');
        }
        return function() {
            if (parameters) {
                return  fn(...parameters);
            } else {
                return fn();
            }
        };
    }
};
