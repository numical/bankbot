const msg = 'Bye!';
const promise = Promise.resolve(msg);
const bye = state => promise;

bye.content = msg;

module.exports = bye;
