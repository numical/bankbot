'use strict';
const replyTo = require('../../chatbot/replyTo.js');

const receiveWeb = (req, res) => {
  const { id, message } = req.body;
  const replyContext = {
    number: id,
    sendMessage: (replyContext, message) => {
      res.send(200, message);
    }};
  replyTo(replyContext, message);
};

module.exports = receiveWeb;
