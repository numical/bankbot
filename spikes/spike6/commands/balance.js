const balance = state => {
  const balance = state.user.accounts.current.balance;
  return Promise.resolve(`Your current account balance is £${balance}.`);
};

module.exports = balance;
