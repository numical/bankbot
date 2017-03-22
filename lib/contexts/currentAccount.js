const balance = require('../commands/balance.js');
const Context = require('./context.js');

const context = new Context('Current Account');
context.addCommand('balance', balance);

module.exports = () => context;
