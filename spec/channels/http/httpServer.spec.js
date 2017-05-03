/* eslint-env mocha */

const server = require('../../../lib/channels/http/httpServer.js').server;
const request = require('supertest');

describe('http server tests', () => {
  it('root path responds with 404', () => {
    return request(server)
      .post('/')
      .send({
        sender: '447771845842',
        text: 'Unit test message'})
      .expect(404);
  });

  it('missing channel responds with 400', () => {
    return request(server)
      .post('/message')
      .send({
        sender: '447771845842',
        text: 'Unit test message'})
      .expect(400);
  });

  it('incoming SMS message responds with 200', () => {
    return request(server)
      .post('/message')
      .send({
        channel: 'SMS',
        sender: '447771845842',
        text: 'Unit test message'})
      .expect(200);
  });

  it('incoming web message responds with 200', () => {
    return request(server)
      .post('/message')
      .send({
        channel: 'WEB',
        id: '447771845842',
        text: 'Unit test message'})
      .expect(200);
  });

  it('web notification query responds with 204', () => {
    return request(server)
      .get('/notification')
      .expect(204);
  });

  it('health check responds with 200', () => {
    return request(server)
      .get('/health')
      .expect(200);
  });
});
