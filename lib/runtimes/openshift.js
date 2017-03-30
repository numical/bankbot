const init = require('../services/init.js');
const messageReceiver = require('../channels/sms/messageReceiver.js');
const port = process.env.NODE_PORT || 1971;
const hostname = process.env.NODE_IP || 'localhost';

init();
messageReceiver.start(port, hostname);
