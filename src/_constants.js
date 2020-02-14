const path = require('path');

const WS = ' ';
const USE_DEBUG = true;
const TIME_COLOR = 'takes';
const CURRENT_WD = process.cwd();
const USE_TTY = process.stderr.isTTY;
const GITMOJO_FILE = '.gitmojorc.json';
const GITMOJO_ROOTPATH = path.join(__dirname, '..');
const DEFAULT_CONFIG_FILE = path.join(GITMOJO_ROOTPATH, GITMOJO_FILE);

module.exports = {
  WS,
  USE_DEBUG,
  TIME_COLOR,
  CURRENT_WD,
  GITMOJO_FILE,
  GITMOJO_ROOTPATH,
  DEFAULT_CONFIG_FILE,
};
