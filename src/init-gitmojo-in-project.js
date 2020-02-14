const path = require('path');
const fse = require('fs-extra');

const {
  USE_DEBUG,
  CWD,
  COMMIT_EMOJIS_FILE,
  DEFAULT_CONFIG_FILE,
} = require('./_constants');
const exitWithSuccess = require('./exit-with-success');
const generateContributingFile = require('./generate-contrib');

function copyConfigFileToCurrentProject(configFile) {
  const filename = path.basename(configFile);
  const outputfile = path.join(CWD, filename);
  fse.copySync(configFile, outputfile, { overwrite: USE_DEBUG });
  return outputfile;
}

function run(name, sub, options) {
  const configFile = DEFAULT_CONFIG_FILE;
  const configOutputfile = copyConfigFileToCurrentProject(configFile);
  if (options.doc || options.d) {
    generateContributingFile(configOutputfile);
  }
  exitWithSuccess();
}

module.exports = run;
