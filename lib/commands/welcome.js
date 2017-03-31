const { NAME } = require('../constants/botfields.js');
const yesno = require('../contexts/yesno.js');
const payCreditCard = require('../contexts/payCreditCard.js');
const setUpCreditCardPayment = require('../commands/setUpCreditCardPayment.js');
const doNotSetUpCreditCardPayment = require('../commands/doNotSetUpCreditCardPayment.js');

const welcomeFirstTimeUser = state => {
  state.contexts.push(payCreditCard());
  state.contexts.push(yesno(setUpCreditCardPayment, doNotSetUpCreditCardPayment));
  return `Hi ${state.user.name}, I'm ${NAME}. As this is your first time, some setup.  Should I notify you when your credit card repayment is due?`;
};

const welcomeUser = state => {
  return `Hi ${state.user.name}, I'm ${NAME}. What can I do for you?`;
};

const welcome = (replyContext, state) => {
  const action = state.user.isFirstTimeUser ? welcomeFirstTimeUser : welcomeUser;
  return Promise.resolve(action(state));
};

module.exports = welcome;
