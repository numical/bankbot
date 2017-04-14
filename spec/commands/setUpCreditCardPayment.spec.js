/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
require('../initialiseTests.js');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const payOffCreditCardQuery = require('../../lib/commands/payOffCreditCardQuery.js');
const { RANDOM_DELAY } = require('../../lib/services/schedule.js');

const scheduleCommand = sinon.spy();
const subject = proxyquire('../../lib/commands/setUpCreditCardPayment.js', {
  '../services/schedule.js': { scheduleCommand },
  '../constants/botfields.js': { NAME: 'TEST BOT NAME' }
});
const replyContext = {
  foo: 'bar'
};
const state = {
  user: {
    name: 'TEST USER NAME',
    accounts: {
      creditcard: {
        date: 35
      }
    }
  }
};

describe('set up credit card command', () => {
  before(() => {
    scheduleCommand.reset();
  });

  it('returns  message', async () => {
    const expected = 'Ok, I will notify you about any outstanding credit card repayment around the 35th of the month. In the meantime you can check your [balance].';
    await subject(replyContext, state).should.eventually.equal(expected);
  });

  it('schedules the payOffCreditCardQuery', async () => {
    await subject(replyContext, state);
    scheduleCommand.called.should.be.true;
  });

  it('schedules passes correct args to payOffCreditCardQuery', async () => {
    await subject(replyContext, state);
    scheduleCommand.calledWithExactly(
        payOffCreditCardQuery,
        replyContext,
        RANDOM_DELAY).should.be.true;
  });
});
