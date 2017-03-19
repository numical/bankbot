const restify = require('restify');

const echo = (req, res) => {
  res.send(200);
};

const server = restify.createServer({
  name: 'botserver',
  version: '0.0.1'
});

server.post('/', echo);

const start = (port = 8080) => {
  server.listen(port);
};

module.exports = {
  server,
  start
};
