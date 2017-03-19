const BotError = require('../errors/BotError.js');
const initialiseContexts = require('../contexts/initialiseContexts.js');
const { users } = require('../../data/users.json');

let states;

const init = () => {
  states = users
    .map(user => ({ user }))
    .map(initialiseContexts);
};

const reset = () => new Promise((resolve, reject) => {
  try {
    init();
    resolve();
  } catch (err) {
    reject(err);
  }
});

const getState = exchangeContext => new Promise((resolve, reject) => {
  for (const property in exchangeContext) {
    const found = states.find(state => state.user[property] === exchangeContext[property]);
    if (found) {
      resolve(found);
      return;
    }
  }
  reject(new BotError('Sorry, I cannot be sure who you are.'));
});

init();

module.exports = {
  getState,
  reset
};
