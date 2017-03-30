// const { ADMIN_NUMBERS } = require('../constants/botfields.js');
const BotError = require('../errors/BotError.js');
const createNewStateBasedOnNumber = require('./createNewStateBasedOnNumber.js');
const states = require('./states.js');

const matchExistingStateOnAnyProperty = replyContext => {
  for (const property in replyContext) {
    const found = states.find(state => state.user[property] === replyContext[property]);
    if (found) return found;
  }
};

const getState = replyContext => new Promise((resolve, reject) => {
  let found = matchExistingStateOnAnyProperty(replyContext);
  if (!found) {
    found = createNewStateBasedOnNumber(replyContext);
  }
  return found
    ? resolve(found)
    : reject(new BotError('Sorry, I cannot be sure who you are.'));
});

module.exports = getState;
