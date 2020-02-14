const fse = require('fs-extra');
const emoji = require('emojilib');
const tablemark = require('tablemark');

const { CWD, CONTRIBUTING_FILE } = require('./_constants');
const writeOuputFile = require('./write-output-file');

function getSymbolByType(input) {
  const firstchar = input.charAt(0);
  const isalpha = /^[a-z]$/.test(firstchar);
  if (isalpha) return emoji.lib[input].char;
  return input;
}

function getEntryArraySymbol({ keyword, tag, alias }) {
  const symbol = getSymbolByType(tag);
  const aliases = (alias || []).concat([tag]);
  return { keyword, tag, symbol, alias: aliases };
}

function run(configFile) {
  const emojis = fse.readJsonSync(configFile);
  const table = emojis.map(getEntryArraySymbol);
  const markdown = tablemark(table);
  writeOuputFile(markdown, CONTRIBUTING_FILE, CWD);
}

module.exports = run;
