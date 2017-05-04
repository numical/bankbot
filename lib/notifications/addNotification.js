'use strict';
const { serialize } = require('../commands/commandSerializer.js');
const { insert } = require('./notifications.js');

const addNotification = async (id, command) => insert(id, serialize(command));

module.exports = addNotification;
