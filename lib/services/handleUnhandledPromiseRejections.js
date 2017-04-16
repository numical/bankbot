'use strict';
const format = obj => JSON.stringify(obj, null, 2);

process.on('unhandledRejection', (unhandled) => {
  console.error('Bankbot threw an unhandled rejection:');
  console.trace(unhandled);
  console.error(`Current environment: ${format(process.env)}`);
});
