module.exports = {
    attempt: function(fn, ...parameters) {
        if (typeof fn !== 'function') {
            throw new Error('First argument must be a function');
        }
        try {
            let result;
            if (parameters) {
                result = fn(...parameters);
            } else {
                result = fn();
            }
            return { result };
        } catch(error) {
            return { error };
        }
    }
};
