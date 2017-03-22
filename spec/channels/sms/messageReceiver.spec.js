/* eslint-env mocha */

const server = require('../../../lib/channels/sms/messageReceiver.js').server;
const request = require('supertest');

describe('Message receiver tests', () => {
  it('basic test responds with 200', () => {
    return request(server)
      .post('/')
      .send({sender: '447771845842', text: 'Unit test message'})
      .expect(200);
  });

  it('health check responds with 200', () => {
    return request(server)
      .get('/health')
      .expect(200);
  });
});
