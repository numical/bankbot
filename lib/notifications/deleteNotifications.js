'use strict';
const { serialize } = require('../commands/commandSerializer.js');
const del = require('./notifications.js').delete;

const deleteNotifications = async (id, command) =>
  command ? del(id, serialize(command)) : del(id);

module.exports = deleteNotifications;
