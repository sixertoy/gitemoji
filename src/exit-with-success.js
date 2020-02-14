const { TIME_COLOR, WS } = require('./_constants');
const { version, name } = require('../package.json');

function exitWithSuccess(message) {
  let msg = message || `Gitmojo initialized with success${WS}`;
  msg = `\u001b[32m${msg}\u001b[39m`;
  process.stdout.write(msg);
  console.timeEnd(TIME_COLOR);
  process.exit(0);
}

module.exports = exitWithSuccess;
