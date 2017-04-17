'use strict';
const debug = require('debug')('conversational-node:schedule');
const getState = require('./getState.js');
const scheduled = require('../contexts/scheduled.js');
const { replyTo, SCHEDULER } = require('../channels/channels.js');

const randomDelayInSeconds = () => 1000 * (Math.floor(30 + (Math.random() * 30)));

const RANDOM_DELAY = Symbol('random delay');

const triggerReply = async (replyContext, command) => {
  debug('triggering reply %O with context %O', replyContext, command);
  const state = await getState(replyContext);
  const commandId = String(Date.now());
  state.contexts.push(scheduled(command, commandId));

  const triggeredContext = Object.assign({}, replyContext, {
    channel: SCHEDULER,
    sendChannel: replyContext.channel
  });
  return replyTo(triggeredContext, commandId);
};

const scheduleReply = async(replyContext, command, delay) => {
  if (delay === RANDOM_DELAY) {
    delay = randomDelayInSeconds();
  }
  debug('scheduling reply %O with delay %d seconds', command, delay);
  if (delay) {
    setTimeout(triggerReply, delay, replyContext, command);
  } else {
    process.nextTick(triggerReply, replyContext, command);
  }
};

module.exports = {
  scheduleReply,
  triggerReply,
  RANDOM_DELAY
};
