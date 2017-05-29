/* eslint-env mocha */
require('./initialiseTests.js');
const { deserialize: convertToCommand } = require('lib/commands/commandSerializer.js');
const fs = require('fs');
const path = require('path');
const reset = require('lib/persistence/reset.js');
const respondTo = require('lib/chatbot/respondTo.js');

const createResponseContext = (data, actual) => {
  const responseContext = JSON.parse(data);
  responseContext.sendMessage = (message) => {
    actual.botReply = message;
  };
  return responseContext;
};

// if starts with '[' and ends with ']', the name of command
const commandPattern = /^[[](.*)[\]]$/;
const createResponseEvent = data => {
  const isACommand = commandPattern.exec(data);
  if (isACommand) {
    return convertToCommand(isACommand[1]);
  }
  return data;
};

const setExpectedReply = (data, expected) => {
  expected.botReply = data;
};

const generateScriptTest = testData => async () => {
  const actual = {};
  const expected = {};
  const responseContext = createResponseContext(testData.shift(), actual);
  while (testData.length > 1) {
    const responseEvent = createResponseEvent(testData.shift());
    setExpectedReply(testData.shift(), expected);
    await respondTo(responseContext, responseEvent);
    actual.botReply.should.equal(expected.botReply);
  }
};

// read scripts - sync as mocha scans for 'it' definitions before async ops finish
const scriptPath = path.resolve(__dirname, './scripts');
const loadScripts = dir => {
  const scripts = {};
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.resolve(scriptPath, file);
    scripts[file] = fs.readFileSync(filePath, 'utf-8').split('\n');
  });
  return scripts;
};
const scripts = loadScripts(scriptPath);

// permit a subset of scripts to be selected
const only = []; // ['5_pay_credit_card_alice_max'];
const describeFn = only.length > 0 ? describe.only : describe;

// main test
describeFn('Scripts', () => {
  beforeEach(() => {
    reset();
  });
  let numberOfScriptsRun = 0;
  Object.keys(scripts).forEach(script => {
    if ((only.length === 0) || only.includes(script)) {
      it(script, generateScriptTest(scripts[script]));
      numberOfScriptsRun += 1;
    }
  });
  it('at least one script should be run', () => {
    numberOfScriptsRun.should.be.at.least(1);
  });
});
