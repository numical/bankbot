const BotError = require('../errors/BotError.js');
const debug = require('debug')('bankbot:replyTo');
const getState = require('../persistence/getState.js');
const selectCommand = require('./selectCommand.js');
const unexpectedErrorMessage = 'Oh dear, I have encountered a problem';

const replyTo = async (replyContext, whatUserSays) => {
  try {
    const state = await getState(replyContext);
    const command = await selectCommand(whatUserSays, state);
    const message = await command(replyContext, state);
    replyContext.sendMessage(replyContext, message);
    return message;
  } catch (err) {
    debug('replyTo error: %O', err);
    const message = (err instanceof BotError) ? err.content : unexpectedErrorMessage;
    replyContext.sendMessage(replyContext, message);
    return message;
  }
};

module.exports = replyTo;
module.exports.unexpectedErrorMessage = unexpectedErrorMessage;
