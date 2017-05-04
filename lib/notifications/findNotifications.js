'use strict';
const { deserialize } = require('../commands/commandSerializer.js');
const { search } = require('./notifications.js');

const findNotifications = async (id) => search(id).map(command => deserialize(command));

module.exports = findNotifications;
