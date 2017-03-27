const { NAME } = require('../constants/botfields.js');
const payOffCreditCardQuery = require('../commands/payOffCreditCardQuery.js');
const { scheduleCommand, RANDOM_DELAY } = require('../services/schedule.js');

const welcome = (replyContext, state) => {
  scheduleCommand(payOffCreditCardQuery, replyContext, RANDOM_DELAY);
  const msg = `Hi ${state.user.name}, I'm ${NAME}. What can I do for you? (Text 'help' if you need assistance.)`;
  return Promise.resolve(msg);
};

module.exports = welcome;
