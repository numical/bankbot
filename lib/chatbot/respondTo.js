const debug = require('debug')('bankbot:respondTo');
const BotError = require('lib/errors/BotError.js');
const getState = require('lib/persistence/getState.js');
const selectCommand = require('./selectCommand.js');
const unexpectedErrorMessage = 'Oh dear, I have encountered a problem';

const respondToCommand = async (responseContext, command, state) => {
  state = state || await getState(responseContext);
  const message = await command(responseContext, state);
  responseContext.sendMessage(responseContext, message);
  return message;
};

const replyToWhatUserSaid = async(replyContext, whatUserSaid) => {
  try {
    const state = await getState(replyContext);
    const command = await selectCommand(whatUserSaid, state);
    return respondToCommand(replyContext, command);
  } catch (err) {
    throw err;
  }
};

const respondTo = async (responseContext, responseEvent) => {
  try {
    switch (typeof responseEvent) {
      case 'string':
        return await replyToWhatUserSaid(responseContext, responseEvent);
      case 'function':
        return await respondToCommand(responseContext, responseEvent);
      default:
        throw new BotError('Unknown response event: %O', responseEvent);
    }
  } catch (err) {
    debug('error: %O', err);
    const message = (err instanceof BotError) ? err.content : unexpectedErrorMessage;
    responseContext.sendMessage(responseContext, message);
    return message;
  }
};

module.exports = respondTo;
module.exports.unexpectedErrorMessage = unexpectedErrorMessage;
