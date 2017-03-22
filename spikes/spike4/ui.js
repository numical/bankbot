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
const respond = reply => {
  say(reply);
  listen();
};
const exitCommands = ['bye', 'Bye', 'quit', 'Quit', 'exit', 'Exit', 'log off'];
const exit = () => {
  chatbot.endChat().then(reply => {
    say(reply);
    process.exit();
  });
};

// initialise
clear();
chatbot.startChat().then(respond);
ui
  .on('line', line => {
    if (exitCommands.includes(line)) {
      exit();
    } else {
      chatbot.repl(line).then(respond);
    }
  })
  .on('close', () => {
    exit();
  });
