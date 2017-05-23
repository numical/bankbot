'use strict';
const replyTo = require('lib/chatbot/respondTo.js');

const receiveWeb = (req, res) => {
  const { id, message } = req.body;
  const replyContext = {
    number: id,
    sendMessage: (replyContext, response) => {
      res.send(200, response);
    }};
  replyTo(replyContext, message);
};

module.exports = receiveWeb;
