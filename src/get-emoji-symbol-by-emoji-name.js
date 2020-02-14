const emoji = require('emojilib');

function getEmojiSymbolByKeyword(keyword) {
  const firstchar = keyword.charAt(0);
  const isalpha = /^[a-z]$/i.test(firstchar);
  // TODO ajouter plus de vérification si il s'agit bien d'un keyword
  if (!isalpha) return keyword;
  const emojiObj = emoji.lib[keyword];
  if (!emojiObj) return keyword;
  return emojiObj.char;
}

module.exports = getEmojiSymbolByKeyword;
