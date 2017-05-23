'use strict';
require('../lib/services/handleUnhandledPromiseRejections.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const enforceNodePath = require('enforce-node-path');
const path = require('path');

enforceNodePath(path.resolve(__dirname, '..'));

chai.use(chaiAsPromised);
chai.should();
