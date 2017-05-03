'use strict';
class BotError extends Error {
  constructor (message) {
    super(message);
    this.content = message;
  }
}

module.exports = BotError;
