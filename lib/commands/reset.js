const reset = require('../services/persistence.js').reset;

const action = () => {
  reset();
  return Promise.resolve('ADMIN: persistence service reset');
};

module.exports = () => action;
