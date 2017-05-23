'use strict';
const replyTo = require('lib/chatbot/respondTo.js');
const sendMessage = require('./processSender');

const reply = async (context, message) => {
  const replyContext = Object.assign({}, { sendMessage }, context);
  return await replyTo(replyContext, message);
};

module.exports = reply;
