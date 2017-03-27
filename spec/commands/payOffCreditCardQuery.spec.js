/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
require('../initialisedChai.js');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');
const { content } = require('../../lib/commands/payOffCreditCardQuery.js');
const persistence = require('../../lib/services/persistence.js');

const sendMessage = sinon.spy();
const replyContext = { number: 'TEST NUMBER' };

describe('pay off credit card query command', () => {
  beforeEach(() => {
    sendMessage.reset();
  });
/*
  describe('with persistence mocked', () => {
    const state = { user: { number: 'MOCKED TEST NUMBER' } };
    const getState = sinon.stub().returns(Promise.resolve(state));
    const subject = proxyquire('../../lib/commands/payOffCreditCardQuery.js', {
      '../services/persistence.js': { getState },
      '../channels/sms/messageSender.js': sendMessage
    });

    beforeEach(() => {
      getState.reset();
    });

    it('calls persistence with passed reply context', async () => {
      await subject(replyContext);
      getState.calledWithExactly(replyContext);
    });

    it('calls send message with user number and message', async () => {
      await subject(replyContext);
      sendMessage.calledWithExactly('MOCKED TEST NUMBER', content);
    });
  });
*/
  describe('with real persistence', () => {
    const subject = proxyquire('../../lib/commands/payOffCreditCardQuery.js', {
      '../channels/sms/messageSender.js': sendMessage
    });

    it('calls send with user number and message', async () => {
      await subject(replyContext);
      sendMessage.calledWithExactly('TEST NUMBER', content);
    });

    afterEach(async () => {
      persistence.reset();
    });
  });
});
