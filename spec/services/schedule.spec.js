'use strict';
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
require('../initialiseTests.js');
const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const { Scheduled } = require('../../lib/contexts/scheduled.js');

const state = {
  contexts: []
};
const getState = stub().resolves(state);
const replyTo = stub();

const subject = proxyquire('../../lib/services/schedule.js', {
  '../persistence/getState.js': getState,
  '../chatbot/replyTo.js': replyTo
});
const replyContext = {
  foo: 'bar',
  channel: 'original channel'
};
const command = () => {};

describe('Schedule Service', () => {
  beforeEach(() => {
    state.contexts = [];
    getState.resetHistory();
    replyTo.resetHistory();
  });

  it('exports RANDOM DELAY', () => {
    subject.RANDOM_DELAY.should.be.a('symbol');
  });

  it('calls persistence service with passed replyContex', async () => {
    await subject.triggerReply(replyContext, command);
    getState.calledWith(replyContext).should.be.true;
  });

  it('adds a scheduled command to the context', async() => {
    await subject.triggerReply(replyContext, command);
    state.contexts.length.should.equal(1);
    state.contexts[0].should.be.an.instanceof(Scheduled);
    state.contexts[0].command.should.equal(command);
  });

  it('calls chatbot replyTo', async() => {
    await subject.triggerReply(replyContext, command);
    replyTo.calledOnce.should.be.true;
  });

  it('passes reply contexti and command to replyTo', async() => {
    await subject.triggerReply(replyContext, command);
    replyTo.calledWithExactly(replyContext, command);
  });
});
