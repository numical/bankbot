'use strict';
import natural from 'natural';

const readLine = require('readline');

const ui = readLine.createInterface({
  input: process.stdin,
  output: process.stout
});
const listen = ui.prompt.bind(ui);
const say = console.log;
const clear = () => say('\x1Bc');

const calculateScore = (word1, word2) => {
  const start = process.hrtime();
  const jw = natural.JaroWinklerDistance(word1, word2);
  const lev = natural.LevenshteinDistance(word1, word2);
  const dice = natural.DiceCoefficient(word1, word2);
  const duration = Math.round(process.hrtime(start)[1] / 1000);
  return `JaroWinkler: ${jw}; Levenshtein: ${lev}; Dice: ${dice} (${duration}\u00B5s)`;
};

let wordToScoreAgainst;

clear();
say('Enter words and I will give you a score of how similar they are:');
listen();
ui
.on('line', word => {
  if (wordToScoreAgainst) {
    say(calculateScore(wordToScoreAgainst, word));
  } else {
    wordToScoreAgainst = word;
    say(`Subsequent words will be scored against '${word}' and reported in the form:`);
    say(calculateScore(wordToScoreAgainst, word));
  }
  listen();
})
.on('close', () => {
  say('Bye!');
});
