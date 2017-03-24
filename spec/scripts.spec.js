/* eslint-env mocha */
require('./initialisedChai.js');
const replyTo = require('../lib/chatbot/replyTo.js');
const fs = require('fs');
const path = require('path');
const persistence = require('../lib/services/persistence.js');

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

describe('Scripts', () => {
  beforeEach(() => {
    persistence.reset();
  });
  Object.keys(scripts).forEach(script => {
    it(script, generateScriptTest(scripts[script]));
  });
});
