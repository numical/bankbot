/* eslint-env mocha */
'use strict';
require('../../initialiseTests.js');
const moment = require('moment');
const sendMessage = require('../../../lib/channels/sms/smsSender.js');
const { ADMIN_NUMBERS, TEST_NUMBERS } = require('../../../lib/constants/botfields.js');
const fakePhone = TEST_NUMBERS[0];
const realPhone = ADMIN_NUMBERS[0];

describe('SMS sender tests', () => {
  it('basic send works with fake phone number', async () => {
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
