/* eslint-env mocha */
require('../services/initialisedChai.js');
const BotError = require('../errors/BotError.js');
const bye = require('../commands/bye.js');
const notUnderstood = require('../commands/notUnderstood.js');
const unexpectedError = require('../commands/unexpectedError.js');
const proxyquire = require('proxyquire');

const subject = proxyquire('./replyTo.js', {
  '../services/persistence.js': {
    getState: () => ({
      user: {
        name: 'Alice'
      },
      contexts: []
    })
  }
});

const errorMessage = 'test error msg';
const errorSubject = proxyquire('./replyTo.js', {
  '../services/persistence.js': {
    getState: () => {
      throw new Error(errorMessage);
    }
  }
});
const botErrorSubject = proxyquire('./replyTo.js', {
  '../services/persistence.js': {
    getState: () => {
      throw new BotError(errorMessage);
    }
  }
});

describe('replyTo - ', () => {
  it('replies to gibberish with Not Understood message', async () => {
    await subject({}, 'xyzjkl').should.eventually.equal(notUnderstood.content);
  });

  it('replies to bye with Bye message', async () => {
    await subject({}, 'bye').should.eventually.equal(bye.content);
  });

  it('handles an unexpected Error by displaying the Unexpected Error message', async () => {
    await errorSubject({}, 'anything').should.eventually.equal(unexpectedError.content);
  });

  it('handles a BotError by displaying the BotError\'s message', async () => {
    await botErrorSubject({}, 'anything').should.eventually.equal(errorMessage);
  });
});
