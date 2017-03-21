const fetch = require('node-fetch');
const debug = require('debug')('conversational-node:SMS');
const env = require('node-env-file');
const path = require('path');
const qs = require('querystring');

env(path.join(__dirname, '/../..', '/.env'));

const URL = 'https://rest.textmagic.com/api/v2/messages';

const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-TM-Username': process.env.TEXT_MAGIC_USER,
  'X-TM-Key': process.env.TEXT_MAGIC_KEY
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
