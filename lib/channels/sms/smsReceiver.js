'use strict';
const replyTo = require('../../chatbot/replyTo.js');
const sendMessage = require('./smsSender.js');

const receiveSms = (req, res) => {
  const { sender, text } = req.body;
  const replyContext = {
    number: sender,
    sendMessage };
  replyTo(replyContext, text);
  res.send(200);
};

module.exports = receiveSms;
