'use strict';
const { PROCESS, replyTo } = require('../channels.js');
/*
const channels = require('../channels.js');
const PROCESS = channels.PROCESS;
const replyTo = channels.replyTo;
*/

const reply = async (context, message) => {
  const replyContext = Object.assign({}, {channel: PROCESS}, context);
  return await replyTo(replyContext, message);
};

module.exports = reply;
