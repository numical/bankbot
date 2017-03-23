const BotError = require('../errors/BotError.js');
const debug = require('debug')('conversational-node:replyTo');
const getState = require('../services/persistence.js').getState;
const selectCommand = require('./selectCommand.js');
const unexpectedError = require('../commands/unexpectedError.js');

const replyTo = (exchangeContext, whatUserSays) =>
  generateReply(exchangeContext, whatUserSays).catch(handleError);

const generateReply = async (exchangeContext, whatUserSays) => {
  const state = await getState(exchangeContext);
  const command = await selectCommand(whatUserSays, state);
  debug('running %o', command);
  return command(state, exchangeContext);
};

const handleError = err =>
  (err instanceof BotError)
    ? Promise.resolve(err.content)
    : unexpectedError(err);

module.exports = replyTo;
