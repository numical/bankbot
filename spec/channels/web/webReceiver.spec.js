/* eslint-env mocha */
const proxyquire = require('proxyquire');
const { stub } = require('sinon');

const request = {
  body: {
    id: 'test number',
    message: 'test message'
  }
};
const send = stub();
const response = { send };
const respondTo = stub();
const subject = proxyquire('lib/channels/web/webReceiver.js', {
  'lib/chatbot/respondTo.js': respondTo
});

describe('Web receiver tests', () => {
  beforeEach(() => {
    send.resetHistory();
    respondTo.resetHistory();
  });

  it('passes message to respondTo', () => {
    subject(request, response);
    respondTo.firstCall.args[1].should.equal('test message');
  });

  it('passes the id in the reply context', () => {
    subject(request, response);
    const responseContext = respondTo.firstCall.args[0];
    responseContext.number.should.equal('test number');
  });

  it('passes a function in the reply context', () => {
    subject(request, response);
    const responseContext = respondTo.firstCall.args[0];
    responseContext.sendMessage.should.be.a('function');
  });

  it('the passed function calls send with 200 http code and a response', () => {
    subject(request, response);
    const responseContext = respondTo.firstCall.args[0];
    responseContext.sendMessage(null, 'test response');
    send.calledWithExactly(200, 'test response');
  });
});
