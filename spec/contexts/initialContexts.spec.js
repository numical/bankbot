/* eslint-env mocha */
'use strict';
require('../initialiseTests.js');
const subject = require('../../lib/contexts/initialContexts.js');
const { WelcomeContext } = require('../../lib/contexts/welcome.js');

describe('Initial Contexts', () => {
  it('returns a non-empty array', () => {
    subject().should.have.length.at.least(1);
  });
  it('includes the welcome context', () => {
    subject()[0].should.be.an.instanceof(WelcomeContext);
  });
});
