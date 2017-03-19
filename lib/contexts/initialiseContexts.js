const WelcomeContext = require('./Welcome.js');

const initialiseContexts = state => {
  const contexts = [];
  contexts.push(new WelcomeContext());
  return Object.assign({}, state, {contexts});
};

initialiseContexts.ifNecessary = state => {
  return (state.contexts) ? state : initialiseContexts(state);
};

module.exports = initialiseContexts;
