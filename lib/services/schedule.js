'use strict';

const scheduleCommand = (command, delay) => {
  setTimeout(command, delay);
};

module.exports = scheduleCommand;
