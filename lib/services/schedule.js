'use strict';
const debug = require('debug')('conversational-node:schedule');

const randomDelay = () => 30000 + (Math.random() * 60000);

const RANDOM_DELAY = Symbol('random delay');

const scheduleCommand = (command, replyContext, delay) => {
  if (delay === RANDOM_DELAY) {
    delay = randomDelay();
  }
  debug('scheduling command %O with delay %d', command, delay);
  setTimeout(command, delay, replyContext);
};

module.exports = {
  scheduleCommand,
  RANDOM_DELAY
};
