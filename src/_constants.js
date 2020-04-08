require('dotenv').config();
const os = require('os');
const path = require('path');

const WS = ' ';
const EOL = os.EOL;
const CWD = process.cwd();
const TIME_COLOR = 'takes';
const GIT_FOLDER_NAME = '.git';
const USE_TTY = process.stderr.isTTY;
const GITMOJO_FILE = '.gitmojorc.json';
const CONTRIBUTING_FILE = 'GITMOJO.md';
const TAG_REGEX = /(:[a-z0-9]+:)/gim;
const GITMOJO_ROOTPATH = path.join(__dirname, '..');
const USE_DEBUG = process.env.NODE_ENV === 'development';
const HUKSY_COMMIT_MESSAGE_PARAM = process.env.HUSKY_GIT_PARAMS;
const DEFAULT_CONFIG_FILE = path.join(GITMOJO_ROOTPATH, GITMOJO_FILE);

module.exports = {
  WS,
  EOL,
  CWD,
  USE_TTY,
  TAG_REGEX,
  USE_DEBUG,
  TIME_COLOR,
  GITMOJO_FILE,
  GIT_FOLDER_NAME,
  HUKSY_COMMIT_MESSAGE_PARAM,
  GITMOJO_ROOTPATH,
  CONTRIBUTING_FILE,
  DEFAULT_CONFIG_FILE,
};
