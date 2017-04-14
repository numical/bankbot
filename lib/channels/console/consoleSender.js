'use strict';
const send = async(replyContext, message) => {
  console.log(message);
  return message;
};

send.clear = async () => send(null, '\x1Bc');

module.exports = send;
