/* eslint-env mocha */
const should = require('chai').should();
const createContext = require('../../lib/contexts/payCreditCard.js');
const { DEFINITE, POSSIBLE } = require('../../lib/constants/matchingThresholds.js');

describe('Pay credit card context', () => {
  it('does not match rubbish', () => {
    const match = createContext().match('flubble');
    match.score.should.be.below(POSSIBLE);
    should.not.exist(match.command);
  });

  it('matches max', () => {
    const match = createContext().match('max');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches maximum', () => {
    const match = createContext().match('maximum');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches min', () => {
    const match = createContext().match('min');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches minimum', () => {
    const match = createContext().match('minimum');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches on an integer amount', () => {
    const match = createContext().match('80');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches on a float amount', () => {
    const match = createContext().match('12.34');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches on a currency amount', () => {
    const match = createContext().match('£45');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });

  it('matches on a currency float amount', () => {
    const match = createContext().match('£23.45');
    match.score.should.be.at.least(DEFINITE);
    match.command.name.should.equal('makePayment');
  });
});
