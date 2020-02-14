const fse = require('fs-extra');
const tablemark = require('tablemark');

const { CWD, CONTRIBUTING_FILE } = require('./_constants');
const writeOuputFile = require('./write-output-file');
const getEmojiSymbolByEmojiName = require('./get-emoji-symbol-by-emoji-name');

function mapTagsToEmojis({ emojiName, tag, alias }) {
  const emojiSymbol = getEmojiSymbolByEmojiName(emojiName);
  const aliases = (alias || []).concat([emojiName]);
  return { emojiName, tag, emojiSymbol, alias: aliases };
}

function run(configFile) {
  const exists = configFile && fse.existsSync(configFile);
  if (!exists) {
    const msg = 'Missing GitMojo config file in current project';
    throw new Error(msg);
  }
  const emojis = fse.readJsonSync(configFile);
  const table = emojis.map(mapTagsToEmojis);
  const markdown = tablemark(table);
  writeOuputFile(markdown, CONTRIBUTING_FILE, CWD);
}

module.exports = run;
