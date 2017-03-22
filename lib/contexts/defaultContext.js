const bye = require('../commands/bye.js');
const Context = require('./context.js');
const notUnderstood = require('../commands/notUnderstood.js');
const PROBABLE = require('../constants/matchingThresholds.js').PROBABLE;

const notUnderstoodMatch = context => ({
  score: 1,
  command: notUnderstood,
  context
});

class DefaultContext extends Context {
  constructor () {
    super('Default');
  }
  match (userCommand) {
    const bestMatch = super.match(userCommand);
    return (bestMatch.score >= PROBABLE) ? bestMatch : notUnderstoodMatch(this);
  }
}

const context = new DefaultContext();
context.addCommand(['bye', 'goodbye', 'exit', 'quit'], bye);

module.exports = () => context;
