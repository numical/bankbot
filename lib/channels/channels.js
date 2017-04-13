'use strict';
const consoleSender = require('./console/consoleSender.js');
const processSender = require('./process/processSender.js');
const smsSender = require('./sms/smsSender.js');
const chatbotReply = require('../chatbot/replyTo.js');

const CONSOLE = Symbol.for('CONSOLE');
const PROCESS = Symbol.for('PROCESS');
const SMS = Symbol.for('SMS');
const SCHEDULER = Symbol.for('SCHEDULER');

const senders = {};
senders[CONSOLE] = consoleSender;
senders[PROCESS] = processSender;
senders[SMS] = smsSender;

const selectSender = replyContext => {
  const channel = replyContext.sendChannel || replyContext.channel;
  return senders[channel];
};

const replyTo = async (replyContext, whatSenderSaid) => {
  const message = await chatbotReply(replyContext, whatSenderSaid);
  const sendMessage = selectSender(replyContext);
  return sendMessage(replyContext, message);
};

module.exports = {
  CONSOLE,
  PROCESS,
  SMS,
  SCHEDULER,
  replyTo
};
