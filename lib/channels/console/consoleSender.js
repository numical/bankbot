'use strict';
const send = async(replyContext, message) => {
  console.log(message);
};

send.clear = async () => send(null, '\x1Bc');

module.exports = send;
