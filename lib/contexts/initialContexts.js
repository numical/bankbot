'use strict';
const welcomeContext = require('./welcome.js');

const initialContexts = () => {
  const contexts = [];
  contexts.push(welcomeContext());
  return contexts;
};

module.exports = initialContexts;
