'use strict';

import { NAME } from './constants.js';

const startChat = () => Promise.resolve(`Hi, I'm ${NAME}. What can I do for you?`);

const replyTo = whatUserSays => Promise.resolve(whatUserSays);

const endChat = () => Promise.resolve('Bye!');

export default {
  startChat,
  replyTo,
  endChat
};
