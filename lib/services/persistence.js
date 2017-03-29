// const { ADMIN_NUMBERS } = require('../constants/botfields.js');
const BotError = require('../errors/BotError.js');
const initialiseContexts = require('../contexts/initialiseContexts.js');
const { users } = require('../../data/users.json');

const states = [];

const matchExistingStateOnAnyProperty = replyContext => {
  for (const property in replyContext) {
    const found = states.find(state => state.user[property] === replyContext[property]);
    if (found) return found;
  }
};

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

const init = () => {
  const alice = createNewStateBasedOnNumber({number: '07777999999'});
  alice.user.isFirstTimeUser = false;
  const bob = createNewStateBasedOnNumber({number: '07777999998'});
  bob.user.isFirstTimeUser = false;
};

const reset = () => new Promise((resolve, reject) => {
  try {
    states.splice(0);
    init();
    resolve();
  } catch (err) {
    reject(err);
  }
});

const getState = replyContext => new Promise((resolve, reject) => {
  let found = matchExistingStateOnAnyProperty(replyContext);
  if (!found) {
    found = createNewStateBasedOnNumber(replyContext);
  }
  return found
    ? resolve(found)
    : reject(new BotError('Sorry, I cannot be sure who you are.'));
});

init();

module.exports = {
  getState: getState,
  reset: reset
};
