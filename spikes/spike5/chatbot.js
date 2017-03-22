'use strict';

import { NAME } from './constants.js';
import populateContext from './services/populateContext.js';

let context;

const startChat = async (initialContext) => {
  try {
    context = await populateContext(initialContext);
    return `Hi ${context.user}, I'm ${NAME}. What can I do for you?`;
  } catch (err) {
    return `Sorry, I cannot be sure who you are.`;
  }
};

const replyTo = async (whatUserSays) => {
  try {
    switch (whatUserSays) {
      case 'balance':
        const balance = context.accounts.current.balance;
        return `Your current account balance is £${balance}.`;
      default:
        return `Sorry, I only understand the 'balance' command.`;
    }
  } catch (err) {
    return 'Oh dear, an internal error.';
  }
};

const endChat = () => Promise.resolve('Bye!');

export default {
  startChat,
  replyTo,
  endChat
};
