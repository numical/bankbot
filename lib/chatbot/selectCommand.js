const debug = require('debug')('conversational-node:selectCommand');
const ADMIN_NUMBERS = require('../constants/botfields.js').ADMIN_NUMBERS;
const SCORE = require('../constants/matchingThresholds.js');
const adminContext = require('../contexts/admin.js');
const currentAccount = require('../contexts/currentAccount.js');
const notifyContext = require('../contexts/notify.js');
const defaultContext = require('../contexts/defaultContext.js');

const availableContexts = [currentAccount(), notifyContext()];
const adminOptions = adminContext();
const catchAll = defaultContext();

const selectCommand = async (whatUserSays, state) => {
  let selectedMatch;
  // look for probable command in user's contexts
  while (state.contexts.length > 0) {
    const currentContext = state.contexts.pop();
    const bestMatch = currentContext.match(whatUserSays);
    if (bestMatch.score >= SCORE.POSSIBLE) {
      state.contexts.push(currentContext);
      selectedMatch = bestMatch;
      break;
    }
  }
  // score commands in any context and select highest
  if (!selectedMatch) {
    const bestMatch = availableContexts
      .map(context => context.match(whatUserSays))
      .reduce((bestMatch, match) => bestMatch.score > match.score ? bestMatch : match);
    if (bestMatch.score >= SCORE.PROBABLE) {
      state.contexts.push(bestMatch.context);
      selectedMatch = bestMatch;
    }
  }
  // admin context
  if (!selectedMatch && ADMIN_NUMBERS.includes(state.user.number)) {
    const bestMatch = adminOptions.match(whatUserSays);
    if (bestMatch.score === SCORE.DEFINITE) {
      selectedMatch = bestMatch;
    }
  }
  // catch anything else
  if (!selectedMatch) {
    selectedMatch = catchAll.match(whatUserSays);
  }
  debug('selected match: %O', selectedMatch);
  return selectedMatch.command;
};

module.exports = selectCommand;
