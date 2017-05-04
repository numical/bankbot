/* eslint-env mocha */
'use strict';
require('../initialiseTests.js');
const requireDir = require('require-dir');
const { serialize, deserialize } = require('../../lib/commands/commandSerializer.js');

const dir = requireDir('../../lib/commands');
const notSerializer = ([name, command]) => name !== 'commandSerializer';

describe('Command Serializr', () => {
  Object.entries(dir).filter(notSerializer).forEach(([name, command]) => {
    it(`Can serialize and deserialize command ${name}`, () => {
      deserialize(name).should.equal(command);
      serialize(command).should.equal(name);
    });
  });
});
