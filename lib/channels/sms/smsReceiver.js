'use strict';
const respondTo = require('lib/chatbot/respondTo.js');
const createSendMessage = require('./smsSender.js');

const receiveSms = (req, res) => {
  const { sender, text } = req.body;
  const replyContext = {
    number: sender,
    sendMessage: createSendMessage(sender)
  };
  respondTo(replyContext, text);
  res.send(200);
};

module.exports = receiveSms;
