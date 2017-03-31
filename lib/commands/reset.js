const reset = require('../services/persistence.js').reset;

const msg = 'Persistence service reset.';

const action = () => {
  reset();
  return Promise.resolve(msg);
};

action.content = msg;

module.exports = action;
