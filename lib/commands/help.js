const msg = 'Things I can do: check your [balance];';
const promise = Promise.resolve(msg);
const help = state => promise;

help.content = msg;

module.exports = help;
