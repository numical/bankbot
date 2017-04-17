'use strict';
const format = obj => JSON.stringify(obj, null, 2);

const filterEnvProps = () => {
  return Object.entries(process.env).reduce(
    (filtered, [key, value]) => {
      if (key.startsWith('TEXT_MAGIC')) {
        filtered[key] = value;
      }
      return filtered;
    },
    {}
  );
};

process.on('unhandledRejection', (unhandled) => {
  console.error('Bankbot threw an unhandled rejection:');
  console.trace(unhandled);
  console.error(`Current environment: ${format(filterEnvProps())}`);
});
