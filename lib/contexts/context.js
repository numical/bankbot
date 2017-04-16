'use strict';
const calcScore = require('natural').JaroWinklerDistance;
const { DEFINITE, NOT } = require('../constants/matchingThresholds.js');

const noMatch = context => ({
  score: NOT,
  command: undefined,
  context
});

class Context {
  constructor (name, maxMatchAttempts = Number.MAX_VALUE) {
    this.name = name;
    this.commands = [];
    this.fns = [];
    this.maxMatchAttempts = maxMatchAttempts;
    this.numMatchAttempts = 0;
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
    if (this.numMatchAttempts >= this.maxMatchAttempts) {
      return noMatch(this);
    }
    this.numMatchAttempts++;
    return this.commands.reduce(
      (bestMatch, command, index) => {
        const score = (command === Context.ANY)
          ? DEFINITE
          : calcScore(command, userCommand);
        if (score > bestMatch.score) {
          bestMatch.score = score;
          bestMatch.command = this.fns[index];
        }
        return bestMatch;
      },
      noMatch(this)
    );
  }
}
Context.ANY = Symbol('Any');

module.exports = Context;
