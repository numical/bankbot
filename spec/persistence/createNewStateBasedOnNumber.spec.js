/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialiseTests.js');
const { expect } = require('chai');
const BotError = require('../../lib/errors/BotError.js');
const subject = require('../../lib/persistence/createNewStateBasedOnNumber.js');

describe('create new state based on number', () => {
  it('creates a state based on Alice', () => {
    const replyContext = { number: '1' };
    const state = subject(replyContext);
    state.user.name.should.equal('Alice');
  });

  it('creates a state based on Bob', () => {
    const replyContext = { number: '2' };
    const state = subject(replyContext);
    state.user.name.should.equal('Bob');
  });

  it('creates a state with contexts', () => {
    const replyContext = { number: '2' };
    const state = subject(replyContext);
    state.contexts.should.have.length.of.at.least(1);
  });

  it('creates a first time user', () => {
    const replyContext = { number: '2' };
    const state = subject(replyContext);
    state.user.isFirstTimeUser.should.be.true;
  });

  it('throws a BotError is no number passed', () => {
    const replyContext = { name: 'wibble' };
    const test = subject.bind(null, replyContext);
    expect(test).to.throw(BotError, 'Sorry, I cannot be sure who you are.');
  });
});
