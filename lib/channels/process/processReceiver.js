'use strict';
const channels = require('../channels.js');
const PROCESS = channels.PROCESS;
const replyTo = channels.replyTo;
console.log(channels);
console.log(replyTo);
console.log(PROCESS);

const reply = async (context, message) => {
  const replyContext = Object.assign({}, {channel: PROCESS}, context);
  return await replyTo(replyContext, message);
};

module.exports = reply;
