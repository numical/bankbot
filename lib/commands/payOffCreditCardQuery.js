const debug = require('debug')('conversational-node:payOffCreditCardQuery');
const sendMessage = require('../channels/sms/messageSender.js');
const getState = require('../services/persistence.js').getState;

const msg = 'Would you like to pay off your credit card?';

const query = (replyContext) => {
  getState(replyContext)
    .then(state => sendMessage(state.user.number, msg))
    .catch(err => {
      debug(err);
    });
};

query.content = msg;

module.exports = query;
