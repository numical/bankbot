const payOffCreditCardQuery = require('../commands/payOffCreditCardQuery.js');
const { scheduleCommand, RANDOM_DELAY } = require('../services/schedule.js');

const setup = (replyContext, state) => {
  const msg = `Ok, I will notify you about any outstanding credit card repayment around the ${state.user.accounts.creditcard.date}th of the month. In the meantime, you can check your [balance].`;
  scheduleCommand(payOffCreditCardQuery, replyContext, RANDOM_DELAY);
  return Promise.resolve(msg);
};

module.exports = setup;
