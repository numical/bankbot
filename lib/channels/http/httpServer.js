'use strict';
const debug = require('debug')('bankbot:http');
const restify = require('restify');
const receiveSmsMessage = require('../sms/smsReceiver.js');
const receiveWebMessage = require('../web/webReceiver.js');
const { checkForWebNotification } = require('../web/webNotifier.js');

const healthCheck = (req, res) => {
  res.send(200);
};

const incomingMessage = (req, res) => {
  debug('incomingMessage: %0', req.body);
  const { channel } = req.body;
  switch (channel) {
    case 'SMS':
      receiveSmsMessage(req, res);
      return;
    case 'WEB':
      receiveWebMessage(req, res);
      return;
    default:
      debug('incoming message unknown channel: %s', channel);
      res.send(new restify.BadRequestError('Unknown channel'));
  }
};

const server = restify.createServer({
  name: 'BankBot'
});

server.use(restify.bodyParser());

server.get('/health', healthCheck);
server.get('/notification', checkForWebNotification);
server.post('/message', incomingMessage);

const start = (port = 1971, hostname = 'localhost') => {
  server.listen(port, hostname, null, () => {
    debug(
      'http server listening on port %d and host %s and pid %d',
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
