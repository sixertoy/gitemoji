const path = require('path');
const fse = require('fs-extra');

const { CURRENT_WD } = require('./_constants');
const exitWithSuccess = require('./exit-with-success');
const generateContributionFileFromConfig = require('./generate-docs');

function copyConfigFileToCurrentProject(configFile) {
  const filename = path.basename(configFile);
  const outputfile = path.join(CURRENT_WD, filename);
  fse.copySync(configFile, outputfile, {
    errorOnExist: true,
    overwrite: false,
  });
}

function initializeEmojiForCurrentProject(name, sub, options) {
  const configFile = options.c || options.config;
  copyConfigFileToCurrentProject(configFile);
  exitWithSuccess();
}

module.exports = initializeEmojiForCurrentProject;
