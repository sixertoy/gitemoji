require('dotenv').config();
const path = require('path');

const WS = ' ';
const CWD = process.cwd();
const TIME_COLOR = 'takes';
const USE_TTY = process.stderr.isTTY;
const GITMOJO_FILE = '.gitmojorc.json';
const CONTRIBUTING_FILE = 'COMMIT_EMOJIS.md';
const GITMOJO_ROOTPATH = path.join(__dirname, '..');
const USE_DEBUG = process.NODE_ENV === 'development';
const DEFAULT_CONFIG_FILE = path.join(GITMOJO_ROOTPATH, GITMOJO_FILE);

module.exports = {
  WS,
  CWD,
  USE_DEBUG,
  TIME_COLOR,
  GITMOJO_FILE,
  GITMOJO_ROOTPATH,
  CONTRIBUTING_FILE,
  DEFAULT_CONFIG_FILE,
};
