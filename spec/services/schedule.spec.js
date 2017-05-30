'use strict';
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
require('spec/initialiseTests.js');
const proxyquire = require('proxyquire');
const { stub } = require('sinon');

const respondTo = stub();

const subject = proxyquire('lib/services/schedule.js', {
  'lib/chatbot/respondTo.js': respondTo
});
const replyContext = {
  foo: 'bar',
  channel: 'original channel'
};
const command = () => {};

describe('Schedule Service', () => {
  beforeEach(() => {
    respondTo.resetHistory();
  });

  it('exports RANDOM DELAY', () => {
    subject.RANDOM_DELAY.should.be.a('symbol');
  });

  it('calls chatbot respondTo', async() => {
    await subject.triggerReply(replyContext, command);
    respondTo.calledOnce.should.be.true;
  });

  it('passes reply context and command to respondTo', async() => {
    await subject.triggerReply(replyContext, command);
    respondTo.calledWithExactly(replyContext, command);
  });
});
