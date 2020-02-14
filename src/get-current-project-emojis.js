const path = require('path');
const fse = require('fs-extra');

const { CWD, GITMOJO_FILE } = require('./_constants');

function getCurrentProjectEmojis() {
  const emojisfile = path.join(CWD, GITMOJO_FILE);
  const emojisFileExists = fse.pathExistsSync(emojisfile);
  if (!emojisFileExists) return emojis;
  const emojis = fse.readJsonSync(emojisfile);
  const reduced = emojis.reduce((acc, { alias, emojiName, tag }) => {
    const accumulator = {
      [tag]: emojiName,
      [emojiName]: emojiName,
    };
    const reduced = (alias || []).reduce(
      (a, t) => ({ ...a, [t]: emojiName }),
      accumulator
    );
    return { ...acc, ...reduced };
  }, {});
  return reduced;
}

module.exports = getCurrentProjectEmojis;
