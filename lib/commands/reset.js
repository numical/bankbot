const reset = require('../services/reset.js');

const msg = 'Persistence service reset.';

const action = () => {
  reset();
  return Promise.resolve(msg);
};

action.content = msg;

module.exports = action;
