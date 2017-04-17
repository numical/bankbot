'use strict';
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
require('../initialiseTests.js');
const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const { SCHEDULER } = require('../../lib/channels/channels.js');
const { Scheduled } = require('../../lib/contexts/scheduled.js');

const state = {
  contexts: []
};
const getState = stub().resolves(state);
const channels = {
  replyTo: stub()
};
const subject = proxyquire('../../lib/services/schedule.js', {
  './getState.js': getState,
  '../channels/channels.js': channels
});
const replyContext = {
  foo: 'bar',
  channel: 'original channel'
};
const command = () => {};

describe.only('Schedule Service', () => {
  beforeEach(() => {
    state.contexts = [];
    getState.resetHistory();
    channels.replyTo.resetHistory();
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

  it('calls replyTo on channels', async() => {
    await subject.triggerReply(replyContext, command);
    channels.replyTo.calledOnce.should.be.true;
  });

  it('passes modified reply context to replyTo', async() => {
    await subject.triggerReply(replyContext, command);
    const args = channels.replyTo.firstCall.args;
    args.length.should.equal(2);
    const context = args[0];
    context.channel.toString().should.equal(SCHEDULER.toString());
    context.sendChannel.should.equal(replyContext.channel);
  });
});
