/* eslint-env mocha */
require('../initialiseTests.js');
const { calculateBalances, createPayCreditCardAction, MIN, MAX } = require('../../lib/commandCreators/payCreditCard.js');

const state = {
  user: {
    accounts: {
      current: {
        balance: 500.00
      },
      creditcard: {
        balance: 199.99
      }
    }
  }
};

const format = n => Number(n).toFixed(2);

describe('payOffCreditCard', () => {
  describe('calculateBalances', () => {
    it('calculates balances correctly', () => {
      const balances = calculateBalances(100.00, state);
      balances.calcAmount.should.equal(format(100));
      balances.current.should.equal(format(400));
      balances.creditcard.should.equal(format(99.99));
    });

    it('calculates MIN balances correctly', () => {
      const balances = calculateBalances(MIN, state);
      balances.calcAmount.should.equal(format(25.00));
      balances.current.should.equal(format(475));
      balances.creditcard.should.equal(format(174.99));
    });

    it('calculates MAX balances correctly', () => {
      const balances = calculateBalances(MAX, state);
      balances.calcAmount.should.equal(format(199.99));
      balances.current.should.equal(format(300.01));
      balances.creditcard.should.equal(format(0.00));
    });
  });

  describe('createPayCreditCardAction', () => {
    it('reports partial payment correctly', () => {
      const paymentAction = createPayCreditCardAction(75);
      return paymentAction({}, state).should.eventually.equal('You have paid off £75.00 of your credit card balance, which now stands at £124.99. Your current account balance is now £425.00.');
    });

    it('reports MAX payment correctly', () => {
      const paymentAction = createPayCreditCardAction(MAX);
      return paymentAction({}, state).should.eventually.equal('Your credit card is fully paid off. Your current account balance is now £300.01.');
    });

    it('reports full payment (not MAX) correctly', () => {
      const paymentAction = createPayCreditCardAction(199.99);
      return paymentAction({}, state).should.eventually.equal('Your credit card is fully paid off. Your current account balance is now £300.01.');
    });
  });
});
