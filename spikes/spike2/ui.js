'use strict';
import chatbot from './chatbot.js';
import readLine from 'readline';

// set up UI
const ui = readLine.createInterface({
  input: process.stdin,
  output: process.stout
});
const listen = ui.prompt.bind(ui);
const say = console.log;
const clear = () => say('\x1Bc');
const exitCommands = ['bye', 'Bye', 'quit', 'Quit', 'exit', 'Exit', 'log off'];
const exit = () => {
  say(chatbot.endChat());
  process.exit();
};

// initialise
clear();
say(chatbot.startChat());
listen();
ui
  .on('line', line => {
    if (exitCommands.includes(line)) {
      exit();
    } else {
      say(chatbot.reply(line));
      listen();
    }
  })
  .on('close', () => {
    exit();
  });
