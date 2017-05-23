'use strict';
const debug = require('debug')('bankbot:schedule');
const getState = require('lib/persistence/getState.js');
const replyTo = require('lib/chatbot/respondTo.js');
const scheduled = require('lib/contexts/scheduled.js');

const randomDelayInSeconds = () => Math.floor(30 + (Math.random() * 30));

const RANDOM_DELAY = Symbol('random delay');

const triggerReply = async (replyContext, command) => {
  debug('triggering reply %O with context %O', replyContext, command);
  const state = await getState(replyContext);
  const commandId = String(Date.now());
  state.contexts.push(scheduled(command, commandId));

  return replyTo(replyContext, commandId);
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
