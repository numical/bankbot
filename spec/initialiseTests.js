'use strict';
require('../lib/services/handleUnhandledPromiseRejections.js');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
