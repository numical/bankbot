const debug = require('debug')('conversational-node:schedule');
const sendMessage = require('../channels/sms/messageSender.js');
const { getState } = require('../services/persistence.js');

debug('payOffCreditCardQuery: getState: %O', getState);

const calculateAmounts = state => {
  const available = state.accounts.current.balance;
  const owed = state.accounts.creditcard.balance;
  const min = '25.00';
  const max = (available > owed) ? owed : available;
  return { available, owed, min, max };
};

const send = async (replyContext) => {
  const state = await getState(replyContext);
  const { available, owed, min, max } = calculateAmounts(state);
  const msg = `You are due to make a credit card payment.  You owe £${owed} and have £${available} in your current account.  Please choose to make a [minimum/min] payment of £${min}, a [maximum/max] payment of £${max}, or an amount between these two figures.`;
  sendMessage(state.user.number, msg);
  // sendMessage(replyContext.number, msg);
};

const query = (replyContext) => send(replyContext).catch(err => {
  debug('payOffCreditCardQuery: err: %O', err);
});

module.exports = query;
