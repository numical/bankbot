const debug = require('debug')('conversational-node:schedule');
const sendMessage = require('../channels/sms/messageSender.js');

debug('payOffCreditCardQuery: sendMessage: %O', sendMessage);

const dummyState = {
  accounts: {
    current: {
      balance: '740.33'
    },
    creditcard: {
      balance: '199.99'
    }
  }
};

const calculateAmounts = (state = dummyState) => {
  const available = state.accounts.current.balance;
  const owed = state.accounts.creditcard.balance;
  const min = '25.00';
  const max = (available > owed) ? owed : available;
  return { available, owed, min, max };
};

const send = async (replyContext) => {
  const persistence = require('../services/persistence.js');
  debug('payOffCreditCardQuery: persistence: %O', persistence);
  debug('payOffCreditCardQuery: getState: %O', persistence.getState);
  const state = undefined; // await persistence.getState(replyContext);
  const { available, owed, min, max } = calculateAmounts(state);
  const msg = `You are due to make a credit card payment.  You owe £${owed} and have £${available} in your current account.  Please choose between making a [minimum] payment of £${min}, a [maximum] payment of £${max}, or any amount between these two figures.`;
  // sendMessage(state.user.number, msg);
  sendMessage(replyContext.number, msg);
};

const query = (replyContext) => send(replyContext).catch(err => {
  debug('payOffCreditCardQuery: err: %O', err);
});

module.exports = query;
