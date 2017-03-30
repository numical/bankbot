// const { ADMIN_NUMBERS } = require('../constants/botfields.js');
const initialiseContexts = require('../contexts/initialiseContexts.js');
const { users } = require('../../data/users.json');
const states = require('./states.js');

const createNewStateBasedOnNumber = replyContext => {
  const number = replyContext.number;
  if (number) {
    const isFirstTimeUser = true; //  !ADMIN_NUMBERS.includes(number);
    const index = number % 2;
    const user = Object.assign({ number, isFirstTimeUser }, users[index]);
    const newState = initialiseContexts({ user });
    states.push(newState);
    return newState;
  }
};

module.exports = createNewStateBasedOnNumber;
