const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const { CWD, GIT_FOLDER_NAME } = require('./_constants');

function run() {
  const gitRootPath = path.join(CWD, GIT_FOLDER_NAME);
  const hasGitFileOrDirectory = fse.pathExistsSync(gitRootPath);
  if (!hasGitFileOrDirectory) {
    throw new Error('Not a valid git directory');
  }
  const isGitSubmodule = fs.lstatSync(gitRootPath).isFile();
  if (isGitSubmodule) {
    // @TODO read file to get .git/hooks directory
  }
}

module.exports = run;
