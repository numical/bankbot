'use strict';
const Context = require('./context.js');
const { PROBABLE, DEFINITE } = require('../constants/matchingThresholds.js');
const { createPayCreditCardAction, MAX, MIN } = require('../commandCreators/payCreditCard.js');

const isAmount = userCommand => {
  return !Number.isNaN(Number.parseFloat(userCommand));
};

const convertToAmount = userCommand => {
  return Number.parseFloat(userCommand).toFixed(2);
};

const createMaxPaymentAction = () => createPayCreditCardAction(MAX);

const createMinPaymentAction = () => createPayCreditCardAction(MIN);

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
        command: createPayCreditCardAction(convertToAmount(userCommand)),
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
module.exports.PayCreditCard = PayCreditCard;
