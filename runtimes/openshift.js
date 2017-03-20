const messageReceiver = require('../lib/sms/messageReceiver.js');
// const port = process.env.OPENSHIFT_NODEJS_PORT || 1971;
const port = process.env.NODE_PORT || 1971;
messageReceiver.start(port);
