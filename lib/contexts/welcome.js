const Context = require('./context.js');
const welcomeCommand = require('../commands/welcome.js');

class WelcomeContext extends Context {
  constructor () {
    super('Welcome', 1);
  }
}

module.exports = () => {
  const welcome = new WelcomeContext();
  welcome.addCommand(Context.ANY, welcomeCommand);
  return welcome;
};
module.exports.WelcomeContext = WelcomeContext;
