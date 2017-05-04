'use strict';
const payCreditCard = require('../contexts/payCreditCard.js');

const calculateAmounts = (state) => {
  const available = state.user.accounts.current.balance;
  const owed = state.user.accounts.creditcard.balance;
  const min = '25.00';
  const max = (available > owed) ? owed : available;
  return { available, owed, min, max };
};

async function payOffCreditCardQuery (replyContext, state) {
  state.contexts.push(payCreditCard());
  const { available, owed, min, max } = calculateAmounts(state);
  const msg = `You are due to make a credit card payment.  You owe £${owed} and have £${available} in your current account.  Please choose between making a [minimum] payment of £${min}, a [maximum] payment of £${max}, or any amount between these two figures.`;
  return msg;
}

module.exports = payOffCreditCardQuery;
