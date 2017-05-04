'use strict';
const { AVLTree } = require('binary-search-tree');

let notifications = new AVLTree();

module.exports = {
  insert: (key, value) => notifications.insert(key, value),
  delete: (key, value) => notifications.delete(key, value),
  search: (key) => notifications.search(key),
  reset: () => {
    notifications = new AVLTree();
  }
};
