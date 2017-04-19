'use strict';
const debug = require('debug')('bankbot:SMS');
const restify = require('restify');
const { replyTo, SMS } = require('../channels.js');

const healthCheck = (req, res) => {
  res.send(200);
};

const incomingMessage = (req, res) => {
  debug('incomingMessage: %0', req.body);
  const { sender, text } = req.body;
  const replyContext = { number: sender, channel: SMS };
  replyTo(replyContext, text);
  res.send(200);
};

const server = restify.createServer({
  name: 'BankBot'
});

server.use(restify.bodyParser());

server.get('/health', healthCheck);
server.post('/', incomingMessage);

const start = (port = 1971, hostname = 'localhost') => {
  server.listen(port, hostname, null, () => {
    debug(
      'messageReceiver listening on port %d and host %s and pid %d',
      port,
      hostname,
      process.pid
    );
  });
};

module.exports = {
  server,
  start
};
