const messageReceiver = require('../lib/sms/messageReceiver.js');
// const port = process.env.OPENSHIFT_NODEJS_PORT || 1971;
messageReceiver.start();
