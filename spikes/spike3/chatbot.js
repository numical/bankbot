'use strict';

import { NAME } from './constants.js';

const startChat = () => Promise.resolve(`Hi, I'm ${NAME}. What can I do for you?`);

const reply = userSays => Promise.resolve(userSays);

const endChat = () => Promise.resolve('Bye!');

export default {
  startChat,
  reply,
  endChat
};
