/* eslint-env mocha */
require('../services/initialisedChai.js');
const BotError = require('./BotError.js');

const errorMessage = 'test error message';

describe('Select Command - ', () => {
  it('message set on constructor', () => {
    const subject = new BotError(errorMessage);
    subject.message.should.equal(errorMessage);
  });

  it('content set on constructor', () => {
    const subject = new BotError(errorMessage);
    subject.content.should.equal(errorMessage);
  });

  it('is instanceof BotError', () => {
    const subject = new BotError(errorMessage);
    subject.should.be.an.instanceOf(BotError);
  });
});
