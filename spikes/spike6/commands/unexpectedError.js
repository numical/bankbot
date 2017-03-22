const msg = 'Oh dear, I have encounterd a problem.';
const promise = Promise.resolve(msg);
const unexpectedError = err => {
  console.log(err);
  return promise;
};

unexpectedError.content = msg;

module.exports = unexpectedError;
