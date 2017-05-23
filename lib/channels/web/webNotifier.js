'use strict';
const findNotifications = require('lib/notifications/findNotifications.js');
const deleteNotifications = require('lib/notifications/deleteNotifications.js');
const NotImplementedError = require('lib/errors/NotImplementedError.js');
const respondTo = require('lib/chatbot/respondTo.js');

const getId = (req) => req.query ? req.query.userId : undefined;

const createResponseContext = (id, res) => ({
  number: id,
  sendMessage: (replyContext, message) => {
    res.send(200, message);
  }
});

const checkForWebNotification = async(req, res) => {
  const id = getId(req);
  if (!id) {
    res.send(400, 'userId missing');
    return;
  }

  const notifications = await findNotifications(id);
  switch (notifications.length) {
    case 0:
      res.send(204);
      return;
    case 1:
      const responseContext = createResponseContext(id, res);
      await respondTo(responseContext, notifications[0]);
      await deleteNotifications(id);
      break;
    default:
      throw new NotImplementedError();
  }
};

module.exports = {
  checkForWebNotification
};
