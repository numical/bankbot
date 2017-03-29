/* eslint-env mocha */
/* eslint no-unused-expressions : 0 */
require('../initialisedChai.js');
const subject = require('../../lib/commands/welcome.js');

const state = {
  user: {
    name: 'TEST USER NAME'
  }
};

describe('welcome command', () => {
  it('returns welcome message', async () => {
    const expected = 'Hi TEST USER NAME, I\'m BankBot. What can I do for you?';
    await subject({}, state).should.eventually.equal(expected);
  });
});
