'use strict';
const debug = require('debug')('conversational-node:schedule');

const randomDelayInSeconds = () => Math.floor(30 + (Math.random() * 30));

const RANDOM_DELAY = Symbol('random delay');

const scheduleCommand = (command, replyContext, delay) => {
  if (delay === RANDOM_DELAY) {
    delay = randomDelayInSeconds();
  }
  debug('scheduling command %O with delay %d seconds', command, delay);
  setTimeout(command, delay * 1000, replyContext);
};

module.exports = {
  scheduleCommand,
  RANDOM_DELAY
};
