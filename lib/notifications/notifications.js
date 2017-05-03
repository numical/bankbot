'use strict';
const { AVLTree } = require('binary-search-tree');

let notifications = new AVLTree();

module.exports = {
  insert: async (key, value) => notifications.insert(key, value),
  delete: async (key, value) => notifications.delete(key, value),
  search: async (key) => notifications.search(key),
  reset: async () => {
    notifications = new AVLTree();
  }
};
