const Context = require('./context.js');
const { YES_OPTIONS, NO_OPTIONS } = require('../constants/botfields.js');

class YesNo extends Context {
  constructor () {
    super('YesNo', 1);
  }
}

module.exports = (yesCommand, noCommand) => {
  const yesno = new YesNo();
  yesno.addCommand(YES_OPTIONS, yesCommand);
  yesno.addCommand(NO_OPTIONS, noCommand);
  return yesno;
};
