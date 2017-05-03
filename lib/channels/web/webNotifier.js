'use strict';
const findNotifications = require('../../notifications/findNotifications.js');
const NotImplementedError = require('../../errors/NotImplementedError.js');
const replyTo = require('../../chatbot/replyTo.js');

const getId = (req) => req.query ? req.query.userId : undefined;

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
    default:
      throw new NotImplementedError();
  }

  /*
  const { id, message } = req.body;
  const replyContext = {
    number: id,
    sendMessage: (replyContext, message) => {
      res.send(200, message);
    }};
  replyTo(replyContext, message);
  */
};

module.exports = {
  checkForWebNotification
};
