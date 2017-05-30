'use strict';
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
require('spec/initialiseTests.js');
const proxyquire = require('proxyquire');
const { stub, useFakeTimers } = require('sinon');

const respondTo = stub();

const subject = proxyquire('lib/services/schedule.js', {
  'lib/chatbot/respondTo.js': respondTo
});
const replyContext = {
  foo: 'bar',
  channel: 'original channel'
};
const command = () => {};
const delay = 500;

let clock;

describe('Schedule Service', () => {
  beforeEach(() => {
    respondTo.resetHistory();
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('exports RANDOM DELAY', () => {
    subject.RANDOM_DELAY.should.be.a('symbol');
  });

  it('respondTo not called synchronously', async() => {
    subject.scheduleReply(replyContext, command);
    respondTo.notCalled.should.be.true;
  });

  it('respondTo called on next tick if no delay specified', async() => {
    subject.scheduleReply(replyContext, command);
    clock.tick(1);
    respondTo.calledWithExactly(replyContext, command);
  });

  it('respondTo not called before specified delay', async() => {
    subject.scheduleReply(replyContext, command, delay);
    clock.tick(delay - 1);
    respondTo.notCalled.should.be.true;
  });

  it('passes reply context and command to respondTo after specified delay', async() => {
    subject.scheduleReply(replyContext, command, delay);
    clock.tick(delay + 1);
    respondTo.calledWithExactly(replyContext, command);
  });
});
