const debug = require('debug')('conversational-node:SMS');
const restify = require('restify');

const healthCheck = (req, res) => {
  res.send(200);
};

const incomingMessage = (req, res) => {
  debug('incomingMessage: %0', req.body);
  // const { sender, text } = req.body;
  res.send(200);
};

const server = restify.createServer({
  name: 'botserver',
  version: '0.1.0'
});

server.use(restify.bodyParser());

server.get('/health', healthCheck);
server.post('/', incomingMessage);

const start = (port = 1971, hostname = 'localhost') => {
  server.listen(port, hostname, null, (listening) => {
    if (listening) {
      debug(
        'messageReceiver listening on port %d and host %s and pid %d',
        port,
        hostname,
        process.pid
      );
    } else {
      debug('messageReceiver error on start');
    }
  });
};

module.exports = {
  server,
  start
};
