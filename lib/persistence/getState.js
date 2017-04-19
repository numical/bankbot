'use strict';
const states = require('./states.js');

const matchExistingStateOnAnyProperty = replyContext => {
  for (const property in replyContext) {
    const found = states.find(state => state.user[property] === replyContext[property]);
    if (found) return found;
  }
};

const getState = async (replyContext) => {
  let found = matchExistingStateOnAnyProperty(replyContext);
  if (!found) {
    const createNewStateBasedOnNumber = require('./createNewStateBasedOnNumber.js');
    found = createNewStateBasedOnNumber(replyContext);
    states.push(found);
  }
  return found;
};

module.exports = getState;
