'use strict';
const readLine = require('readline');
const replyTo = require('lib/chatbot/respondTo.js');
const sendMessage = require('./consoleSender');

const replyContext = {
  number: '07771845842',
  sendMessage};
const reply = replyTo.bind(null, replyContext);

const clearConsole = console.log.bind(null, '\x1Bc');
const initBot = reply.bind(null, 'Hi');

const ui = readLine.createInterface({
  input: process.stdin,
  output: process.stout
});
const listenForUserInput = ui.prompt.bind(ui);
const respondToUserInput = ui.on.bind(ui, 'line', reply);

clearConsole();
initBot();
listenForUserInput();
respondToUserInput();
