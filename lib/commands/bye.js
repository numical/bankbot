const msg = 'Bye!';
const promise = Promise.resolve(msg);
function bye () {
  return promise;
}

module.exports = bye;
module.exports.content = msg;
