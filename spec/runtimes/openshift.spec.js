/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialisedChai.js');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
const sinon = require('sinon');

const messageReceiver = {
  start: sinon.spy()
};

const load = () => {
  proxyquire('../../lib/runtimes/openshift.js', {
    '../channels/sms/messageReceiver.js': messageReceiver
  });
};

describe('OpenShift runtime', () => {
  it('calls messageReceiver', () => {
    load();
    messageReceiver.start.calledOnce.should.be.true;
  });

  it('uses default config when no env vars', () => {
    load();
    messageReceiver.start.calledWith(1971, 'localhost').should.be.true;
  });

  it('uses env config when available', () => {
    process.env.NODE_IP = 'testIP';
    process.env.NODE_PORT = 'testPort';
    load();
    messageReceiver.start.calledWith('testPort', 'testIP').should.be.true;
  });
  afterEach(() => {
    delete process.env.NODE_IP;
    delete process.env.NODE_PORT;
  });
});
