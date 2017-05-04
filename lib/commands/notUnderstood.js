const msg = 'Sorry, this humble bot does not understand you.';
const promise = Promise.resolve(msg);

function notUnderstood () {
  return promise;
}

module.exports = notUnderstood;
module.exports.content = msg;
