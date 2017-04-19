const query = require('../commands/setUpCreditCardPaymentQuery.js');
const Context = require('./context.js');

const context = new Context('Notify');
context.addCommand(['notify', 'notification'], query);

module.exports = () => context;
