const sendMessage = require('../channels/sms/messageSender.js');
const { getState } = require('../services/persistence.js');

const msg = 'Would you like to pay off your credit card?';

const query = async (replyContext) => {
  const state = await getState(replyContext);
  sendMessage(state.user.number, msg);
};
query.content = msg;

module.exports = query;
