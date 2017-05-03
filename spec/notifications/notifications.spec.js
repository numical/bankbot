/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict';
require('../initialiseTests.js');
const addNotification = require('../../lib/notifications/addNotification.js');
const deleteNotifications = require('../../lib/notifications/deleteNotifications.js');
const findNotifications = require('../../lib/notifications/findNotifications.js');
const resetNotifications = require('../../lib/notifications/resetNotifications.js');

const commands = [
  () => 'first test message',
  () => 'second test message'
];

describe('Notifications', () => {
  beforeEach(async () => {
    await resetNotifications();
  });

  describe.only('Find', () => {
    it('should find nothing if notifications empty', async () => {
      const found = findNotifications('1');
      found.should.eventually.be.empty;
    });
  });

  describe.only('Add', () => {
    it('inserts an entry', async () => {
      const id = '1';
      await addNotification(id, commands[0]);
      const found = findNotifications(id);
      found.should.eventually.have.lengthOf(1);
    });

    it('inserts a command keyed on id', async () => {
      const id = '1';
      await addNotification(id, commands[0]);
      const found = await findNotifications(id);
      found[0].should.equal(commands[0]);
    });
  });

  describe.only('Delete', () => {
    it('deletes an entry', async () => {
      const id = '1';
      await addNotification(id, commands[0]);
      findNotifications(id).should.eventually.have.lengthOf(1);
      await deleteNotifications(id);
      findNotifications(id).should.eventually.be.empty;
    });
  });
});
