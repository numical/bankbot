/* eslint-env mocha */

import chatbot from './chatbot.js';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';
import path from 'path';

chai.use(chaiAsPromised);
chai.should();

// sync as mocha scans for 'it' definitions before async ops finish
const loadScripts = dir => {
  const scripts = {};
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.resolve(__dirname, './scripts', file);
    scripts[file] = fs.readFileSync(filePath, 'utf-8').split('\n');
  });
  return scripts;
};

const scripts = loadScripts(path.resolve(__dirname, './scripts'));

const generateScriptTest = testData =>
  async () => {
    const initialContext = JSON.parse(testData.shift());
    const botsWelcomeMessage = testData.shift();
    await chatbot.startChat(initialContext).should.eventually.equal(botsWelcomeMessage);
    while (testData.length > 1) {
      const whatUserSays = testData.shift();
      const whatBotReplies = testData.shift();
      await chatbot.replyTo(whatUserSays).should.eventually.equal(whatBotReplies);
    }
  };

describe('Chatbot Scripts', () => {
  Object.keys(scripts).forEach(script => {
    it(script, generateScriptTest(scripts[script]));
  });
});
