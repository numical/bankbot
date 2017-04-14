/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialiseTests.js');
const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const { CONSOLE, PROCESS, SMS, SCHEDULER } = require('../../lib/channels/channels.js');

const smsSpy = stub().resolves('');
const processSpy = stub().resolves('');
const subject = proxyquire('../../lib/channels/channels.js', {
  './sms/smsSender.js': smsSpy,
  './process/processSender.js': processSpy,
  '../chatbot/replyTo.js': () => Promise.resolve('')
});

describe('channels', () => {
  beforeEach(() => {
    smsSpy.reset();
    processSpy.reset();
  });

  it('publishes channel identifiers', () => {
    CONSOLE.should.be.truthy;
    PROCESS.should.be.truthy;
    SMS.should.be.truthy;
    SCHEDULER.should.be.truthy;
  });

  it('replies to context\'s channel (process)', async () => {
    const replyContext = { channel: PROCESS };
    await subject.replyTo(replyContext, '');
    processSpy.calledOnce.should.be.true;
    smsSpy.called.should.be.false;
  });

  it('replies to context\'s channel (sms)', async () => {
    const replyContext = { channel: SMS };
    await subject.replyTo(replyContext, '');
    processSpy.called.should.be.false;
    smsSpy.calledOnce.should.be.true;
  });

  it('context\'s send channel overrides context\'s channel', async () => {
    const replyContext = { channel: SMS, sendChannel: PROCESS };
    await subject.replyTo(replyContext, '');
    processSpy.calledOnce.should.be.true;
    smsSpy.called.should.be.false;
  });
});
