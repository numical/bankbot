const msg = 'Ok, but if you change your mind, text [notify]. In the meantime, you can check your [balance].';
const acknowledge = (replyContext, state) => {
  return Promise.resolve(msg);
};
acknowledge.content = msg;

module.exports = acknowledge;
