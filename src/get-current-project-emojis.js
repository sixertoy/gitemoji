const path = require('path');
const fse = require('fs-extra');

const { CWD, GITMOJO_FILE } = require('./_constants');

function reduceAliasesToEmojis(emojiName) {
  return function reduce(acc, alias) {
    return { ...acc, [alias]: emojiName };
  };
}

function reduceTagsToEmojiName(acc, { alias, emojiName, tag }) {
  const obj = { [tag]: emojiName, [emojiName]: emojiName };
  const next = (alias || []).reduce(reduceAliasesToEmojis(emojiName), obj);
  return { ...acc, ...next };
}

function getCurrentProjectEmojis() {
  const emojisfile = path.join(CWD, GITMOJO_FILE);
  const emojisFileExists = fse.pathExistsSync(emojisfile);
  if (!emojisFileExists) return null;
  const emojis = fse.readJsonSync(emojisfile);
  const reduced = emojis.reduce(reduceTagsToEmojiName, {});
  return reduced;
}

module.exports = getCurrentProjectEmojis;
