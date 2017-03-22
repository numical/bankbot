'use strict';

import { NAME } from './constants.js';

const startChat = () => `Hi, I'm ${NAME}. What can I do for you?`;

const reply = userSays => userSays;

const endChat = () => 'Bye!';

export default {
  startChat,
  reply,
  endChat
};
