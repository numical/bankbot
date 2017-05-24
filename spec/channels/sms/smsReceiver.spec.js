/* eslint-env mocha */
const proxyquire = require('proxyquire');
const { stub } = require('sinon');

const request = {
  body: {
    sender: 'test number',
    text: 'test message'
  }
};
const send = stub();
const response = { send };
const respondTo = stub();
const subject = proxyquire('lib/channels/sms/smsReceiver.js', {
  'lib/chatbot/respondTo.js': respondTo
});

describe('Sms receiver tests', () => {
  beforeEach(() => {
    send.resetHistory();
    respondTo.resetHistory();
  });

  it('passes message to respondTo', () => {
    subject(request, response);
    respondTo.firstCall.args[1].should.equal('test message');
  });

  it('passes the sender in the reply context', () => {
    subject(request, response);
    const replyContext = respondTo.firstCall.args[0];
    replyContext.number.should.equal('test number');
  });

  it('passes a send function in the reply context', () => {
    subject(request, response);
    const replyContext = respondTo.firstCall.args[0];
    replyContext.sendMessage.should.be.a('function');
  });

  it('return a 200 http response', () => {
    subject(request, response);
    send.calledWithExactly(200);
  });
});
