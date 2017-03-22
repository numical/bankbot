const Context = require('./context.js');
const welcome = require('../commands/welcome.js');

const previouslyMatched = context => ({
  score: 0,
  command: undefined,
  context
});

const matched = context => ({
  score: 1,
  command: welcome,
  context
});

class WelcomeContext extends Context {
  constructor () {
    super('Welcome');
    this.matched = false;
  }

  match (userCommand) {
    if (this.matched) {
      return previouslyMatched(this);
    } else {
      this.matched = true;
      return matched(this);
    }
  }
}

module.exports = () => new WelcomeContext();
