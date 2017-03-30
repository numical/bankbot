// const { ADMIN_NUMBERS } = require('../constants/botfields.js');
const createNewStateBasedOnNumber = require('./createNewStateBasedOnNumber.js');

const init = () => {
  const alice = createNewStateBasedOnNumber({number: '07777999999'});
  alice.user.isFirstTimeUser = false;
  const bob = createNewStateBasedOnNumber({number: '07777999998'});
  bob.user.isFirstTimeUser = false;
};

module.exports = init;
