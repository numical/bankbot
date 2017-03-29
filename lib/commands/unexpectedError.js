const debug = require('debug')('conversational-node:Chatbot');

const msg = 'Oh dear, I have encountered a problem.';
const promise = Promise.resolve(msg);
const unexpectedError = err => {
  debug(err);
  return promise;
};

unexpectedError.content = msg;

module.exports = unexpectedError;
