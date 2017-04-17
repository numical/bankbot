'use strict';
const Context = require('./context.js');
const { DEFINITE, NOT } = require('../constants/matchingThresholds.js');

class Scheduled extends Context {
  constructor (command, commandId) {
    super('Scheduled', 1);
    this.command = command;
    this.commandId = commandId;
  }

  match (userCommand) {
    return (userCommand === this.commandId)
      ? { score: DEFINITE, command: this.command, context: this }
      : { score: NOT, command: undefined, context: this };
  }
}

module.exports = (command, commandId) => new Scheduled(command, commandId);
module.exports.Scheduled = Scheduled;
