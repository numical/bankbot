const Context = require('./context.js');
const { PROBABLE, DEFINITE } = require('../constants/matchingThresholds.js');
const { createPaymentAction, MAX, MIN } = require('../commands/payOffCreditCard.js');

const isAmount = userCommand => {
  return !Number.isNaN(Number.parseFloat(userCommand));
};

const convertToAmount = userCommand => {
  return Number.parseFloat(userCommand).toFixed(2);
};

const createMaxPaymentAction = () => createPaymentAction(MAX);

const createMinPaymentAction = () => createPaymentAction(MIN);

class PayCreditCard extends Context {
  constructor () {
    super('PayCreditCard');
  }
  match (userCommand) {
    if (userCommand.startsWith('£')) {
      userCommand = userCommand.slice(1);
    }
    if (isAmount(userCommand)) {
      return {
        score: DEFINITE,
        command: createPaymentAction(convertToAmount(userCommand)),
        context: this
      };
    }
    const bestMatch = super.match(userCommand);
    if (bestMatch.score >= PROBABLE) {
      bestMatch.command = bestMatch.command();
    }
    return bestMatch;
  }
}

const context = new PayCreditCard();
context.addCommand(['max', 'maximum'], createMaxPaymentAction);
context.addCommand(['min', 'minimum'], createMinPaymentAction);

module.exports = () => context;
