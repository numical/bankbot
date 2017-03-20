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

const start = (port = 1971) => {
  try {
    server.listen(port);
    debug('messageReceiver listening on port %d', port);
    return true;
  } catch (err) {
    debug('messageReceiver error on start: %O', err);
    return false;
  }
};

module.exports = {
  server,
  start
};
