/* eslint-env mocha */
const proxyquire = require('proxyquire');
const sendMessage = require('../../../lib/channels/sms/smsSender.js');
const { stub } = require('sinon');

const request = {
  body: {
    sender: 'test number',
    text: 'test message'
  }
};
const send = stub();
const response = { send };
const replyTo = stub();
const subject = proxyquire('../../../lib/channels/sms/smsReceiver.js', {
  '../../chatbot/replyTo.js': replyTo
});

describe('Sms receiver tests', () => {
  beforeEach(() => {
    send.resetHistory();
    replyTo.resetHistory();
  });

  it('passes message to replyTo', () => {
    subject(request, response);
    replyTo.firstCall.args[1].should.equal('test message');
  });

  it('passes the sender in the reply context', () => {
    subject(request, response);
    const replyContext = replyTo.firstCall.args[0];
    replyContext.number.should.equal('test number');
  });

  it('passes the sms sender in the reply context', () => {
    subject(request, response);
    const replyContext = replyTo.firstCall.args[0];
    replyContext.sendMessage.should.equal(sendMessage);
  });

  it('return a 200 http response', () => {
    subject(request, response);
    send.calledWithExactly(200);
  });
});
