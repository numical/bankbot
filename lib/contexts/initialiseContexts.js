'user strict';
const welcomeContext = require('./welcome.js');

const initialiseContexts = state => {
  const contexts = [];
  contexts.push(welcomeContext());
  return Object.assign({}, state, {contexts});
};

initialiseContexts.ifNecessary = state => {
  return (state.contexts) ? state : initialiseContexts(state);
};

module.exports = initialiseContexts;
