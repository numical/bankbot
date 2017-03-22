'use strict';

const readLine = require('readline');

const ui = readLine.createInterface({
  input: process.stdin,
  output: process.stout
});
const listen = ui.prompt.bind(ui);
const say = console.log;
const clear = () => say('\x1Bc');

clear();
say('Hi, I\'m an EchoBot. CTRL+D when I get annoying.');
listen();
ui
  .on('line', line => {
    say(line);
    listen();
  })
  .on('close', () => {
    say('Bye!');
  });
