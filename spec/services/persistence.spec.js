/* eslint-env mocha */
require('../initialisedChai.js');
const getState = require('../../lib/services/persistence.js').getState;
const reset = require('../../lib/services/persistence.js').reset;

describe('Persistence', () => {
  describe('getState', () => {
    beforeEach(() => {
      return reset();
    });

    it('returns an error for a context that cannot be initialised', () => {
      const exchangeContext = { foo: 'bar' };
      return getState(exchangeContext).should.be.rejected;
    });

    it('returns Alice for name Alice', () => {
      const exchangeContext = { name: 'Alice' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Alice');
      });
    });

    it('returns Alice for number 07771000001', () => {
      const exchangeContext = { number: '07771000001' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Alice');
      });
    });

    it('returns Bob for name Bob', () => {
      const exchangeContext = { name: 'Bob' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Bob');
      });
    });

    it('returns Bob for number 07771000002', () => {
      const exchangeContext = { number: '07771000002' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Bob');
      });
    });

    it('initialises chat contexts', () => {
      const exchangeContext = { number: '07771000001' };
      return getState(exchangeContext).then(state => {
        state.contexts.should.not.be.empty; // eslint-disable-line 
      });
    });

    it('returns Alice for any odd number', () => {
      const exchangeContext = { number: '1234567' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Alice');
      });
    });

    it('returns Bob for any even number', () => {
      const exchangeContext = { number: '12345678' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Bob');
      });
    });
  });
});
