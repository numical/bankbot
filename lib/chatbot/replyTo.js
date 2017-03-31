const BotError = require('../errors/BotError.js');
const debug = require('debug')('conversational-node:replyTo');
const getState = require('../services/persistence.js').getState;
const selectCommand = require('./selectCommand.js');
const unexpectedError = require('../commands/unexpectedError.js');

const replyTo = (replyContext, whatUserSays) =>
  generateReply(replyContext, whatUserSays).catch(handleError);

const generateReply = async (replyContext, whatUserSays) => {
  const state = await getState(replyContext);
  const command = await selectCommand(whatUserSays, state);
  debug('running %o', command);
  return command(replyContext, state);
};

const handleError = err =>
  (err instanceof BotError)
    ? Promise.resolve(err.content)
    : unexpectedError(err);

module.exports = replyTo;
