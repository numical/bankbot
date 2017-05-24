'use strict';
const respondTo = require('lib/chatbot/respondTo.js');

const receiveWeb = (req, res) => {
  const { id, message } = req.body;
  const replyContext = {
    number: id,
    sendMessage: response => {
      res.send(200, response);
    }};
  respondTo(replyContext, message);
};

module.exports = receiveWeb;
