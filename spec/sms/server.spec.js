/* eslint-env mocha */

const server = require('../../lib/sms/server.js').server;
const request = require('supertest');

describe('Server tests', () => {
  it('basic test responds with 200', () => {
    return request(server)
      .post('/')
      .expect(200);
  });
});
