const resetPersistence = require('../persistence/reset.js');
const msg = 'Persistence service reset.';

async function reset () {
  await resetPersistence();
  return msg;
}

module.exports = reset;
module.exports.content = msg;
