const debug = require('debug')('conversational-node:selectCommand');
const PROBABLE = require('../constants/matchingThresholds.js').PROBABLE;
const POSSIBLE = require('../constants/matchingThresholds.js').POSSIBLE;
const currentAccount = require('../contexts/currentAccount.js');
const defaultContext = require('../contexts/defaultContext.js');

const availableContexts = [currentAccount];

const selectCommand = async (whatUserSays, state) => {
  let selectedMatch;
  // look for probable command in user's contexts
  while (state.contexts.length > 0) {
    const currentContext = state.contexts.pop();
    const currentContextMatch = currentContext.match(whatUserSays);
    if (currentContextMatch.score >= POSSIBLE) {
      state.contexts.push(currentContext);
      selectedMatch = currentContextMatch;
      break;
    }
  }
  // score commands in any context and select highest
  if (!selectedMatch) {
    const bestMatch = availableContexts
      .map(context => context.match(whatUserSays))
      .reduce((bestMatch, match) => bestMatch.score > match.score ? bestMatch : match);
    if (bestMatch.score >= PROBABLE) {
      state.contexts.push(bestMatch.context);
      selectedMatch = bestMatch;
    }
  }
  // default context
  if (!selectedMatch) {
    selectedMatch = defaultContext.match(whatUserSays);
  }
  debug('selected match: %O', selectedMatch);
  return selectedMatch.command;
};

module.exports = selectCommand;
