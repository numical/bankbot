const fetch = require('node-fetch');
const debug = require('debug')('conversational-node:SMS');
const qs = require('querystring');

const URL = 'https://rest.textmagic.com/api/v2/messages';

const user = process.env.TEXT_MAGIC_NAME;
const key = process.env.TEXT_MAGIC_KEY;
debug(`sendMessage init: user: ${user}, key: ${key}`);
const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-TM-Username': user,
  'X-TM-Key': key
};

const generateBody = (phone, msg) =>
  qs.stringify({
    phones: phone,
    text: msg
  });

const generateHeaders = body =>
  Object.assign(
    {},
    {'Content-Length': Buffer.byteLength(body)},
    HEADERS
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
  return fetch(URL, options)
    .then(checkStatus)
    .then(success)
    .catch(failure);
};

module.exports = sendMessage;
