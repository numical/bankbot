/* eslint-env mocha */
require('./initialisedChai.js');
const replyTo = require('../lib/chatbot/replyTo.js');
const fs = require('fs');
const path = require('path');
const reset = require('../lib/services/reset.js');

const only = []; // '4_accept_credit_card_notification'];
const scriptPath = path.resolve(__dirname, './scripts');

// sync as mocha scans for 'it' definitions before async ops finish
const loadScripts = dir => {
  const scripts = {};
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.resolve(scriptPath, file);
    scripts[file] = fs.readFileSync(filePath, 'utf-8').split('\n');
  });
  return scripts;
};

const scripts = loadScripts(scriptPath);

const generateScriptTest = testData =>
  async () => {
    const exchangeContext = JSON.parse(testData.shift());
    while (testData.length > 1) {
      const whatUserSays = testData.shift();
      const whatBotReplies = testData.shift();
      await replyTo(exchangeContext, whatUserSays).should.eventually.equal(whatBotReplies);
    }
  };

const describeFn = only.length > 0 ? describe.only : describe;

describeFn('Scripts', () => {
  beforeEach(() => {
    reset();
  });
  Object.keys(scripts).forEach(script => {
    if ((only.length === 0) || only.includes(script)) {
      it(script, generateScriptTest(scripts[script]));
    }
  });
});
