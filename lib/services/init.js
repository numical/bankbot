'use strict';
const createNewStateBasedOnNumber = require('./createNewStateBasedOnNumber.js');
const states = require('./states.js');

const init = () => {
  const alice = createNewStateBasedOnNumber({number: '07777999999'});
  alice.user.isFirstTimeUser = false;
  states.push(alice);
  const bob = createNewStateBasedOnNumber({number: '07777999998'});
  bob.user.isFirstTimeUser = false;
  states.push(bob);
};

module.exports = init;
