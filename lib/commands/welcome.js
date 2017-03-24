const debug = require('debug')('conversational-node:schedule');
const NAME = require('../constants/botfields.js').NAME;
const payOffCreditCardQuery = require('../commands/payOffCreditCardQuery.js');
const sendMessage = require('../channels/sms/messageSender.js');
const getState = require('../services/persistence.js').getState;
const scheduleCommand = require('../services/schedule.js');

const calculateDelay = () => 30000 + (Math.random() * 60000);

const welcome = (state, exchangeContent) => {
  /*
  const delayedAction = async () => {
    const state = await getState(exchangeContent);
    const msg = await payOffCreditCardQuery(state);
    return sendMessage(state.user.number, msg).catch(err => {
      debug(err);
    });
  };
  const delay = calculateDelay();
  scheduleCommand(delayedAction, delay);
  */
  const msg = `Hi ${state.user.name}, I'm ${NAME}. What can I do for you?`;
  return Promise.resolve(msg);
};

module.exports = welcome;
