const calcScore = require('natural').JaroWinklerDistance;

class Context {
  constructor (name) {
    this.name = name;
    this.commands = [];
    this.fns = [];
  }

  addCommand (userCommand, fn) {
    if (Array.isArray(userCommand)) {
      userCommand.forEach(command => this.addCommand(command, fn));
    } else {
      this.commands.push(userCommand);
      this.fns.push(fn);
    }
  }

  match (userCommand) {
    return this.commands.reduce(
      (bestMatch, command, index) => {
        const score = calcScore(command, userCommand);
        if (score > bestMatch.score) {
          bestMatch.score = score;
          bestMatch.command = this.fns[index];
        }
        return bestMatch;
      },
      { score: 0, command: undefined, context: this }
    );
  }
}

module.exports = Context;
