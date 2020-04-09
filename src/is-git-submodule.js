import fs from 'fs';

function isGitSubmodule(filepath) {
  let isFile = fs.lstatSync(filepath).isFile();
  return isFile;
}

module.exports = isGitSubmodule;
