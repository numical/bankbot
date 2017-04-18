'use strict';
const initialContexts = require('../contexts/initialContexts.js');
const users = require('./users.js');

const createNewStateBasedOnNumber = replyContext => {
  const number = replyContext.number;
  if (!number) return;
  const index = number % 2;
  const user = Object.assign({ isFirstTimeUser: true, number }, users[index]);
  const contexts = initialContexts();
  return { user, contexts };
};

module.exports = createNewStateBasedOnNumber;
