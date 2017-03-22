const fetch = require('node-fetch');
const debug = require('debug')('conversational-node:SMS');
const qs = require('querystring');

const url = 'https://rest.textmagic.com/api/v2/messages';
const user = process.env.TEXT_MAGIC_NAME;
const key = process.env.TEXT_MAGIC_KEY;
const from = process.env.TEXT_MAGIC_PHONE;
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-TM-Username': user,
  'X-TM-Key': key
};

const generateBody = (phone, msg) =>
  qs.stringify({
    phones: phone,
    text: msg,
    from
  });

const generateHeaders = body =>
  Object.assign(
    {},
    {'Content-Length': Buffer.byteLength(body)},
    headers
  );

const checkStatus = response =>
  (response.status >= 200 && response.status < 300)
    ? Promise.resolve(response.json())
    : Promise.reject(new Error(response.statusText));

const success = json => {
  debug('sendMessge - success - %O', json);
  return Promise.resolve(true);
};

const failure = err => {
  debug('sendMessge - failure - %O', err);
  return Promise.resolve(false);
};

const sendMessage = (phone, msg) => {
  const body = generateBody(phone, msg);
  const headers = generateHeaders(body);
  const options = { method: 'POST', headers, body };
  return fetch(url, options)
    .then(checkStatus)
    .then(success)
    .catch(failure);
};

debug(`sendMessage init: user: ${user}, phone: ${from}, key: ${key}`);

module.exports = sendMessage;
