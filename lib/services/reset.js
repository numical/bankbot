// const { ADMIN_NUMBERS } = require('../constants/botfields.js');
const init = require('./init.js');
const states = require('./states.js');

const reset = () => new Promise((resolve, reject) => {
  try {
    states.splice(0);
    init();
    resolve();
  } catch (err) {
    reject(err);
  }
});

init();

module.exports = reset;
