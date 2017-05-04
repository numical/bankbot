async function balance (replyContext, state) {
  const balance = state.user.accounts.current.balance;
  return `Your current account balance is £${balance}.`;
}

module.exports = balance;
