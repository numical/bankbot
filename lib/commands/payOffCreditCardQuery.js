const debug = require('debug')('conversational-node:schedule');
const sendMessage = require('../channels/sms/messageSender.js');
const getState= require('../services/persistence.js').getState;

const msg = 'Would you like to pay off your credit card?';

const send = async (replyContext) => {
  debug('payOffCreditCardQuery: replyContext: %O', replyContext);
  debug('payOffCreditCardQuery: getState: %O', getState);
  const state = await getState(replyContext);
  debug('payOffCreditCardQuery: state: %O', state);
  sendMessage(state.user.number, msg);
};

const query = (replyContext) => send(replyContext).catch(err => {
  debug('payOffCreditCardQuery: err: %O', err);
});
query.content = msg;

module.exports = query;
