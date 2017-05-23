/* eslint-env mocha */
require('../initialiseTests.js');
const bye = require('lib/commands/bye.js');
const notUnderstood = require('lib/commands/notUnderstood.js');
const subject = require('lib/chatbot/selectCommand.js');
const welcome = require('lib/commands/welcome.js');
const welcomeContext = require('lib/contexts/welcome.js');

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
        contexts: [welcomeContext()]
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
