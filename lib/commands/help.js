const msg = 'Things I can do: check your [balance]; setup balance notifiations [notify]';
const promise = Promise.resolve(msg);

function help () {
  return promise;
}

module.exports = help;
module.exports.content = msg;
