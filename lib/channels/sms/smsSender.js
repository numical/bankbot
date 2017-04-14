'use strict';
const debug = require('debug')('conversational-node:SMS');
const fetch = require('node-fetch');
const path = require('path');
const qs = require('querystring');

const setEnv = require('node-env-file');
const envFile = path.join(__dirname, '../../../', '.env');
const envOptions = {verbose: false, raise: false};
setEnv(envFile, envOptions);

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

const isOk = response => (response.status >= 200 && response.status < 300);

const sendMessage = async(phone, msg) => {
  const body = generateBody(phone, msg);
  const headers = generateHeaders(body);
  const options = { method: 'POST', headers, body };
  const response = await fetch(url, options);
  if (isOk(response)) {
    debug('sendMessage - success - %O', response.json());
    return msg;
  } else {
    debug('sendMessage - failure - %O', response.json());
    throw new Error(response.statusText);
  }
};

debug(`sendMessage init: user: ${user}, phone: ${from}, key: ${key}`);

module.exports = sendMessage;
