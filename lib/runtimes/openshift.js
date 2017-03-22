const messageReceiver = require('../lib/channels/sms/messageReceiver.js');
const port = process.env.NODE_PORT || 1971;
const hostname = process.env.NODE_IP || 'localhost';
messageReceiver.start(port, hostname);
