'use strict';
const deleteNotifications = require('./deleteNotifications.js');
const findNotifications = require('./findNotifications.js');
const NotImplementedError = require('lib/errors/NotImplementedError.js');
const respondTo = require('lib/chatbot/respondTo.js');

const triggerNotification = async(id, createResponseContext) => {
  const notifications = await findNotifications(id);
  switch (notifications.length) {
    case 0:
      return false;
    case 1:
      await respondTo(createResponseContext(), notifications[0]);
      await deleteNotifications(id);
      return true;
    default:
      throw new NotImplementedError();
  }
};

module.exports = triggerNotification;
