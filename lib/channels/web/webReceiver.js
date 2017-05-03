'use strict';
const replyTo = require('../../chatbot/replyTo.js');

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
