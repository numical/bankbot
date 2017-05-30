'use strict';
const triggerNotification = require('lib/notifications/triggerNotification.js');

const getId = (req) => req.query ? req.query.userId : undefined;

const createResponseContext = (id, res) => () => ({
  number: id,
  sendMessage: message => {
    res.send(200, message);
  }
});

const checkForWebNotification = async(req, res) => {
  const id = getId(req);
  if (!id) {
    res.send(400, 'userId missing');
    return;
  }

  const triggered = await triggerNotification(id, createResponseContext(id, res));
  if (!triggered) {
    res.send(204);
  }
};

module.exports = checkForWebNotification;
