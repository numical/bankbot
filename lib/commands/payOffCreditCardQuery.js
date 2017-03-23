const msg = 'Would you like to pay off your credit card?';
const promise = Promise.resolve(msg);
const query = state => promise;

query.content = msg;

module.exports = query;
