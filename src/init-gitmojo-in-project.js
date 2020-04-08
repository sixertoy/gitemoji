const path = require('path');
const fse = require('fs-extra');

const { USE_DEBUG, CWD, DEFAULT_CONFIG_FILE } = require('./_constants');
const exitWithSuccess = require('./exit-with-success');
const generateContributingFile = require('./generate-contrib');
const installScriptFileIntoProject = require('./install-script');

function copyConfigFileIntoProject() {
  const filename = path.basename(DEFAULT_CONFIG_FILE);
  const outputfile = path.join(CWD, filename);
  fse.copySync(DEFAULT_CONFIG_FILE, outputfile, { overwrite: USE_DEBUG });
  return outputfile;
}

function run(name, sub, options) {
  const configOutputfile = copyConfigFileIntoProject();
  const generateContributing = options.doc || options.d;
  if (generateContributing) {
    generateContributingFile(configOutputfile);
  }
  const useHusky = options.husky || options.h;
  if (!useHusky) {
    installScriptFileIntoProject();
  }
  exitWithSuccess();
}

module.exports = run;
