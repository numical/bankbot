/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
'use strict';
require('../initialiseTests.js');
const { expect } = require('chai');
const { PayCreditCard } = require('../../lib/contexts/payCreditCard.js');
const subject = require('../../lib/commands/payOffCreditCardQuery.js');

const initState = (currentAccountBalance, creditCardBalance) => ({
  user: {
    accounts: {
      current: {
        balance: currentAccountBalance
      },
      creditcard: {
        balance: creditCardBalance
      }
    }
  },
  contexts: []
});

describe('pay off credit card query command', () => {
  it('returns a message detailing amount owed', async () => {
    const state = initState('500.50', '230.23');
    const msg = await subject({}, state);
    expect(msg).to.contain('You owe £230.23');
  });

  it('returns a message detailing minimum payment', async () => {
    const state = initState('500.50', '230.23');
    const msg = await subject({}, state);
    expect(msg).to.contain('a [minimum] payment of £25.00');
  });

  it('returns a message detailing maximum payment limited by credit balance', async () => {
    const state = initState('500.50', '230.23');
    const msg = await subject({}, state);
    expect(msg).to.contain('a [maximum] payment of £230.23');
  });

  it('returns a message detailing maximum payment limited by current balance', async () => {
    const state = initState('100.11', '230.23');
    const msg = await subject({}, state);
    expect(msg).to.contain('a [maximum] payment of £100.11');
  });

  it('adds a payment context', async () => {
    const state = initState('500.50', '230.23');
    await subject({}, state);
    expect(state.contexts.length).to.equal(1);
    expect(state.contexts[0]).to.be.instanceof(PayCreditCard);
  });
});
