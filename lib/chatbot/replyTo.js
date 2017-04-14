const BotError = require('../errors/BotError.js');
const debug = require('debug')('conversational-node:replyTo');
const getState = require('../services/getState.js');
const selectCommand = require('./selectCommand.js');
const unexpectedErrorMessage = 'Oh dear, I have encountered a problem';

const replyTo = async (replyContext, whatUserSays) => {
  try {
    return await generateReply(replyContext, whatUserSays);
  } catch (err) {
    return (err instanceof BotError) ? err.content : unexpectedErrorMessage;
  }
};

const generateReply = async (replyContext, whatUserSays) => {
  const state = await getState(replyContext);
  const command = await selectCommand(whatUserSays, state);
  debug('running %o', command);
  return command(replyContext, state);
};

module.exports = replyTo;
module.exports.unexpectedErrorMessage = unexpectedErrorMessage;
