/* eslint-env mocha */
require('../initialiseTests.js');
const BotError = require('../../lib/errors/BotError.js');
const bye = require('../../lib/commands/bye.js');
const notUnderstood = require('../../lib/commands/notUnderstood.js');
const { unexpectedErrorMessage } = require('../../lib/chatbot/replyTo.js');
const proxyquire = require('proxyquire');

const subject = proxyquire('../../lib/chatbot/replyTo.js', {
  '../services/getState.js': () => ({
    user: {
      name: 'Alice'
    },
    contexts: []
  })
});

const errorMessage = 'test error msg';
const errorSubject = proxyquire('../../lib/chatbot/replyTo.js', {
  '../services/getState.js': () => {
    throw new Error(errorMessage);
  }
});
const botErrorSubject = proxyquire('../../lib/chatbot/replyTo.js', {
  '../services/getState.js': () => {
    throw new BotError(errorMessage);
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
    await errorSubject({}, 'anything').should.eventually.equal(unexpectedErrorMessage);
  });

  it('handles a BotError by displaying the BotError\'s message', async () => {
    await botErrorSubject({}, 'anything').should.eventually.equal(errorMessage);
  });
});
