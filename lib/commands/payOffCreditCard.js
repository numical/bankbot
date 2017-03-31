const MAX = Symbol('MaxPayment');
const MIN = Symbol('MinPayment');

const format = n => Number(n).toFixed(2);
const ZERO = format(0);

const dummyState = {
  accounts: {
    current: {
      balance: 740.33
    },
    creditcard: {
      balance: 199.99
    }
  }
};

const calculateBalances = (amount, state = dummyState) => {
  let calcAmount;
  if (amount === MIN) {
    calcAmount = 25.00;
  } else if (amount === MAX) {
    calcAmount = state.accounts.creditcard.balance;
  } else {
    calcAmount = amount;
  }
  calcAmount = format(calcAmount);
  const current = format(state.accounts.current.balance - calcAmount);
  const creditcard = format(state.accounts.creditcard.balance - calcAmount);
  return { calcAmount, current, creditcard };
};

const createPaymentAction = amount => function makePayment (replyContext, state) {
  const { calcAmount, current, creditcard } = calculateBalances(amount, state);
  const msg = (creditcard === ZERO)
    ? `Your credit card is fully paid off. Your current account balance is now £${current}.`
    : `You have paid off £${calcAmount} of your credit card balance, which now stands at £${creditcard}. Your current account balance is now £${current}.`;
  return Promise.resolve(msg);
};

module.exports = {
  calculateBalances,
  createPaymentAction,
  MAX,
  MIN
};
