/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
require('../initialisedChai.js');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const { content } = require('../../lib/commands/payOffCreditCardQuery.js');

const state = { user: { number: 'TEST NUMBER' } };
const getState = sinon.stub().returns(Promise.resolve(state));
const sendMessage = sinon.spy();
const subject = proxyquire('../../lib/commands/payOffCreditCardQuery.js', {
  '../services/persistence.js': { getState },
  '../channels/sms/messageSender.js': sendMessage
});
const replyContext = { foo: 'bar' };

describe.only('pay off credit card query command', () => {
  beforeEach(() => {
    getState.reset();
    sendMessage.reset();
  });

  it('calls persistence with passed reply context', async () => {
    await subject(replyContext);
    getState.calledWithExactly(replyContext);
  });

  it('calls send message with user number and message', async () => {
    await subject(replyContext);
    sendMessage.calledWithExactly('TEST NUMBER', content);
  });
});
