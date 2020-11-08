module.exports = {
  TysonError: class TysonError extends Error {
    constructor(message) {
      super(message);
      this.name = 'TysonError';
    }
  },
};
