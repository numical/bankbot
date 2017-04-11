'use strict';
const processSender = require('./process/processSender.js');
const smsSender = require('./sms/smsSender.js');
const chatbotReply = require('../chatbot/replyTo.js');

const CONSOLE = Symbol.for('Console');
const PROCESS = Symbol.for('Process');
const SMS = Symbol.for('SMS');
const SCHEDULER = Symbol.for('Scheduler');

const senders = {};
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
