const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection during test: ', reason);
});
