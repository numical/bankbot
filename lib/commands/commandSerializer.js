'use strict';

const serialize = command => command.name;

const deserialize = name => require(`./${name}.js`);

module.exports = {
  serialize,
  deserialize
};
