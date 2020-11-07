module.exports = {
    call: function (fn, ...parameters) {
        return function() {
            fn(...parameters);
        };
    }
};
