const msg = 'Sorry, this humble bot does not understand you.';
const promise = Promise.resolve(msg);
const notUnderstood = state => promise;

notUnderstood.content = msg;

module.exports = notUnderstood;
