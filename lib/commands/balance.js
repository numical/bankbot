const getState = require('../services/getState.js');

const balance = async (replyContext) => {
  const state = await getState(replyContext);
  const balance = state.user.accounts.current.balance;
  return `Your current account balance is £${balance}.`;
};

module.exports = balance;
