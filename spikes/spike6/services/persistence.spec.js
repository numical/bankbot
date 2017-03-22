/* eslint-env mocha */
require('./initialisedChai.js');
const getState = require('./persistence.js').getState;
const reset = require('./persistence.js').reset;

describe('Service: persistence', () => {
  describe('getState', () => {
    beforeEach(() => {
      return reset();
    });

    it('returns an error for an unknown context', () => {
      const exchangeContext = { number: '07771999999' };
      return getState(exchangeContext).should.be.rejected;
    });

    it('returns Alice for number 07771000001', () => {
      const exchangeContext = { number: '07771000001' };
      return getState(exchangeContext).then(state => {
        state.user.name.should.equal('Alice');
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
  });
});
