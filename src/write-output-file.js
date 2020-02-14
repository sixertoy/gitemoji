const path = require('path');
const fse = require('fs-extra');

function writeOuputFile(content, outputFilename, outputFolder) {
  try {
    const outputFile = path.join(outputFolder, outputFilename);
    fse.writeFileSync(outputFile, content, { encoding: 'utf8' });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = writeOuputFile;
