'use strict';
require('../services/handleUnhandledPromiseRejections.js');
const initialisePersistence = require('../persistence/init.js');
const server = require('../channels/http/httpServer.js');
const port = process.env.PORT || 1971;
const host = process.env.HOST || '0.0.0.0';
initialisePersistence();
server.start(port, host);
