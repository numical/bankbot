/* eslint-env mocha */
'use strict';
require('../../initialiseTests.js');
const moment = require('moment');
const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const sendMessage = require('../../../lib/channels/sms/smsSender.js');
const { ADMIN_NUMBERS, TEST_NUMBERS } = require('../../../lib/constants/botfields.js');
const fakePhone = TEST_NUMBERS[0];
const realPhone = ADMIN_NUMBERS[0];

const fetch = stub().returns({ ok: true });
const subject = proxyquire('../../../lib/channels/sms/smsSender.js', {
  'node-fetch': fetch
});
const replyContext = { number: 'testNumber' };
const message = 'testMessage';

describe('SMS sender tests', () => {
  beforeEach(() => {
    fetch.resetHistory();
  });

  it('posts to textmagic url', async () => {
    await subject(replyContext, message);
    const url = fetch.firstCall.args[0];
    url.should.equal('https://rest.textmagic.com/api/v2/messages');
  });

  xit('basic send works with fake phone number', async () => {
    const now = moment();
    const replyContext = { number: fakePhone };
    const msg = `Test message sent at ${now.hour()}:${now.minute()}:${now.second()}`;
    return await sendMessage(replyContext, msg).should.eventually.equal(msg);
  });

  xit('basic send works with real phone number', async () => {
    const now = moment();
    const replyContext = { number: realPhone };
    const msg = `Test message sent at ${now.hour()}:${now.minute()}:${now.second()}`;
    return await sendMessage(replyContext, msg).should.eventually.equal(msg);
  });
});
