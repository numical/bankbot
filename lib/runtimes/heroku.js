'use strict';
require('../services/handleUnhandledPromiseRejections.js');
const init = require('../persistence/init.js');
const messageReceiver = require('../channels/sms/smsReceiver.js');
const port = process.env.PORT || 1971;

init();
messageReceiver.start(port);
