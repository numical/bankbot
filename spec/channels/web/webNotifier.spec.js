/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
const proxyquire = require('proxyquire');
const { stub } = require('sinon');

const send = stub();
const response = { send };
const replyTo = stub();
const checkForWebNotification = proxyquire('lib/channels/web/webNotifier.js', {
  'lib/chatbot/respondTo.js': replyTo
});

describe('Web notifier tests', () => {
  beforeEach(() => {
    send.resetHistory();
    replyTo.resetHistory();
  });

  it('returns a 404 http response if no query string passed', async() => {
    const request = {};
    await checkForWebNotification(request, response);
    send.calledWithExactly(400, 'userId missing').should.be.true;
  });

  it('returns a 404 http response if no userId passed', async() => {
    const request = {
      query: {
        userId: null
      }
    };
    await checkForWebNotification(request, response);
    send.calledWithExactly(400, 'userId missing').should.be.true;
  });

  it('returns a 204 http response when no notifications for passed id', async() => {
    const request = {
      query: {
        userId: '12345'
      }
    };
    await checkForWebNotification(request, response);
    send.calledWithExactly(204).should.be.true;
  });
});
