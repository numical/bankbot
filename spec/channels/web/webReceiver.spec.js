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
const replyTo = stub();
const subject = proxyquire('../../../lib/channels/web/webReceiver.js', {
  '../../chatbot/replyTo.js': replyTo
});

describe('Web receiver tests', () => {
  beforeEach(() => {
    send.resetHistory();
    replyTo.resetHistory();
  });

  it('passes message to replyTo', () => {
    subject(request, response);
    replyTo.firstCall.args[1].should.equal('test message');
  });

  it('passes the id in the reply context', () => {
    subject(request, response);
    const replyContext = replyTo.firstCall.args[0];
    replyContext.number.should.equal('test number');
  });

  it('passes a function in the reply context', () => {
    subject(request, response);
    const replyContext = replyTo.firstCall.args[0];
    replyContext.sendMessage.should.be.a('function');
  });

  it('the passed function calls send with 200 http code and a response', () => {
    subject(request, response);
    const replyContext = replyTo.firstCall.args[0];
    replyContext.sendMessage(null, 'test response');
    send.calledWithExactly(200, 'test response');
  });
});
