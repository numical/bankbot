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
    const index = number % 2;
    const user = Object.assign({ number }, users[index]);
    const newState = initialiseContexts({ user });
    states.push(newState);
    return newState;
  }
};

const reset = () => new Promise((resolve, reject) => {
  try {
    states.splice(0);
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

module.exports = {
  getState,
  reset
};
