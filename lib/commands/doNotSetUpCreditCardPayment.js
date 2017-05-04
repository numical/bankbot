'use strict';
const msg = 'Ok, but if you change your mind, text [notify]. In the meantime, you can check your [balance].';
const promise = Promise.resolve(msg);

function doNotSetUpCreditCardPayment () {
  return promise;
}

module.exports = doNotSetUpCreditCardPayment;
module.exports.content = msg;
