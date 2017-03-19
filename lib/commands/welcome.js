const NAME = require('../constants/botfields.js').NAME;

const welcome = state => Promise.resolve(
  `Hi ${state.user.name}, I'm ${NAME}. What can I do for you?`
);

module.exports = welcome;
