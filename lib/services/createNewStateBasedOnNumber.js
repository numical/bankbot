'use strict';
const BotError = require('../errors/BotError.js');
const initialContexts = require('../contexts/initialContexts.js');
const users = require('./users.js');

const createNewStateBasedOnNumber = replyContext => {
  const number = replyContext.number;
  if (!number) throw new BotError('Sorry, I cannot be sure who you are.');
  const index = number % 2;
  const user = Object.assign(
    { isFirstTimeUser: true, number },
    users[index]
  );
  const contexts = initialContexts();
  return { user, contexts };
};

module.exports = createNewStateBasedOnNumber;
