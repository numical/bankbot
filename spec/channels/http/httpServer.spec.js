/* eslint-env mocha */

const server = require('../../../lib/channels/http/httpServer.js').server;
const request = require('supertest');

describe('http server tests', () => {
  it('missing channel responds with 400', () => {
    return request(server)
      .post('/')
      .send({
        sender: '447771845842',
        text: 'Unit test message'})
      .expect(400);
  });

  it('incoming SMS responds with 200', () => {
    return request(server)
      .post('/')
      .send({
        channel: 'SMS',
        sender: '447771845842',
        text: 'Unit test message'})
      .expect(200);
  });

  it('health check responds with 200', () => {
    return request(server)
      .get('/health')
      .expect(200);
  });
});
