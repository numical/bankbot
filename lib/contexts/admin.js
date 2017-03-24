const Context = require('./context.js');
const reset = require('../commands/reset.js');

class AdminContext extends Context {
  constructor () {
    super('Default');
  }
  match (userCommand) {
    // override - exact matches only
    const index = this.commands.indexOf(userCommand);
    return index < 0
      ? { score: 0, command: undefined, context: this }
      : { score: 1, command: this.fns[index], contxt: this };
  }
}

const adminPrefix = 'Admin:';
const context = new AdminContext();
context.addCommand(`${adminPrefix}reset`, reset);

module.exports = () => context;
