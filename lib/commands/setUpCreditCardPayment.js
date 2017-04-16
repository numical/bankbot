'use strict';
const payOffCreditCardQuery = require('../commands/payOffCreditCardQuery.js');
const { scheduleReply, RANDOM_DELAY } = require('../services/schedule.js');

const setup = async (replyContext, state) => {
  await scheduleReply(replyContext, payOffCreditCardQuery, RANDOM_DELAY);
  const msg = `Ok, I will notify you about any outstanding credit card repayment around the ${state.user.accounts.creditcard.date}th of the month. In the meantime you can check your [balance].`;
  return msg;
};

module.exports = setup;
