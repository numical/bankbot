/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
require('../initialisedChai.js');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const payOffCreditCardQuery = require('../../lib/commands/payOffCreditCardQuery.js');
const { RANDOM_DELAY } = require('../../lib/services/schedule.js');

const scheduleCommand = sinon.spy();
const subject = proxyquire('../../lib/commands/welcome.js', {
  '../services/schedule.js': { scheduleCommand },
  '../constants/botfields.js': { NAME: 'TEST BOT NAME' }
});
const replyContext = {
  foo: 'bar'
};
const state = {
  user: {
    name: 'TEST USER NAME'
  }
};

describe('welcome command', () => {
  before(() => {
    scheduleCommand.reset();
  });

  it('returns welcome message', async () => {
    const expected = 'Hi TEST USER NAME, I\'m TEST BOT NAME. What can I do for you?';
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
