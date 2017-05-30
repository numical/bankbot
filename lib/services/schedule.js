'use strict';
const debug = require('debug')('bankbot:schedule');
const respondTo = require('lib/chatbot/respondTo.js');

const randomDelayInSeconds = () => Math.floor(30 + (Math.random() * 30));

const RANDOM_DELAY = Symbol('random delay');

const triggerReply = async (replyContext, command) => {
  debug('triggering reply %O with context %O', replyContext, command);
  respondTo(replyContext, command);
};

const scheduleReply = async(replyContext, command, delay) => {
  if (delay === RANDOM_DELAY) {
    delay = randomDelayInSeconds();
  }
  debug('scheduling reply %O with delay %d seconds', command, delay);
  if (delay) {
    setTimeout(triggerReply, delay * 1000, replyContext, command);
  } else {
    process.nextTick(triggerReply, replyContext, command);
  }
};

module.exports = {
  scheduleReply,
  triggerReply,
  RANDOM_DELAY
};
