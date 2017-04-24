/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialiseTests.js');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
const sinon = require('sinon');

const server = {
  start: sinon.spy()
};

const load = () => {
  proxyquire('../../lib/runtimes/heroku.js', {
    '../channels/http/httpServer.js': server
  });
};

describe('Heroku runtime', () => {
  it('starts server', () => {
    load();
    server.start.calledOnce.should.be.true;
  });

  it('uses default config when no env vars', () => {
    load();
    server.start.calledWith(1971, '0.0.0.0').should.be.true;
  });

  it('uses env config when available', () => {
    process.env.HOST = 'testIP';
    process.env.PORT = 'testPort';
    load();
    server.start.calledWith('testPort', 'testIP').should.be.true;
  });
  afterEach(() => {
    delete process.env.HOST;
    delete process.env.PORT;
  });
});
