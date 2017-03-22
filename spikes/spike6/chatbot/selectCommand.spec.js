/* eslint-env mocha */
require('../services/initialisedChai.js');
const bye = require('../commands/bye.js');
const notUnderstood = require('../commands/notUnderstood.js');
const subject = require('./selectCommand.js');
const welcome = require('../commands/welcome.js');
const WelcomeContext = require('../contexts/Welcome.js');

let state;

describe('Select Command - ', () => {
  describe('with no contexts - ', () => {
    beforeEach(() => {
      state = {
        user: {
          name: 'Alice'
        },
        contexts: []
      };
    });

    it('select Not Understood when passed gibberish', async () => {
      await subject('xyzjkl', state).should.eventually.equal(notUnderstood);
    });

    describe('Bye options - ', () => {
      ['bye', 'goodbye', 'exit', 'quit'].forEach((byeCommand) => {
        it(`select Bye when '${byeCommand}' passed`, async () => {
          await subject(byeCommand, state).should.eventually.equal(bye);
        });
      });
    });
  });

  describe('With Welcome context', () => {
    const userCommands = ['xyzjkl', 'bye', 'account', 'hi', 'help'];
    beforeEach(() => {
      state = {
        user: {
          name: 'Bob'
        },
        contexts: [new WelcomeContext()]
      };
    });

    userCommands.forEach((userCommand) => {
      it(`selects Welcome whatever first command is (${userCommand}) is`, async () => {
        await subject(userCommand, state).should.eventually.equal(welcome);
      });
    });

    userCommands.forEach((userCommand) => {
      it(`never selects Welcome on second command (${userCommand})`, async () => {
        await subject(userCommand, state);
        await subject(userCommand, state).should.eventually.not.equal(welcome);
      });
    });
  });
});
