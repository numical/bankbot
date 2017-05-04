/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialiseTests.js');
const addNotification = require('../../lib/notifications/addNotification.js');
const deleteNotifications = require('../../lib/notifications/deleteNotifications.js');
const findNotifications = require('../../lib/notifications/findNotifications.js');
const resetNotifications = require('../../lib/notifications/resetNotifications.js');
const welcome = require('../../lib/commands/welcome.js');

describe('Notifications', () => {
  beforeEach(async () => {
    await resetNotifications();
  });

  describe('Find', () => {
    it('should find nothing if notifications empty', async () => {
      const found = findNotifications('1');
      found.should.eventually.be.empty;
    });
  });

  describe('Add', () => {
    it('inserts an entry', async () => {
      const id = '1';
      await addNotification(id, welcome);
      const found = findNotifications(id);
      found.should.eventually.have.lengthOf(1);
    });

    it('inserts a command keyed on id', async () => {
      const id = '1';
      await addNotification(id, welcome);
      const found = await findNotifications(id);
      found[0].should.equal(welcome);
    });
  });

  describe('Delete', () => {
    it('deletes an entry', async () => {
      const id = '1';
      await addNotification(id, welcome);
      findNotifications(id).should.eventually.have.lengthOf(1);
      await deleteNotifications(id);
      findNotifications(id).should.eventually.be.empty;
    });
  });
});
