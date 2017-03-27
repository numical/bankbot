const debug = require('debug')('conversation-node:schedule');
const sendMessage = require('../channels/sms/messageSender.js');
const { getState } = require('../services/persistence.js');

const msg = 'Would you like to pay off your credit card?';

const query = async (replyContext) => {
  debug('payOffCreditCardQuery: replyContext: %O', replyContext);
  debug('payOffCreditCardQuery: getState: %O', getState);
  const state = await getState(replyContext);
  debug('payOffCreditCardQuery: state: %O', state);
  sendMessage(state.user.number, msg);
};
query.content = msg;

module.exports = query;
