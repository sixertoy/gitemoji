const path = require('path');
const fse = require('fs-extra');

const getCurrentProjectEmojis = require('./get-current-project-emojis');
const getEmojiSymbolByEmojiName = require('./get-emoji-symbol-by-emoji-name');
const {
  CWD,
  EOL,
  TAG_REGEX,
  CONTRIBUTING_FILE,
  GITMOJO_FILE,
  HUKSY_COMMIT_MESSAGE_PARAM,
} = require('./_constants');

function filterUniqValuesInArray(v, i, a) {
  return a.indexOf(v) === i;
}

function removeTagDoubleDotDelimiter(tag) {
  return tag.split(':').join('');
}

function getCommitFile() {
  const splitted = HUKSY_COMMIT_MESSAGE_PARAM.split(' ')[0];
  const commitFile = path.join(CWD, splitted);
  return commitFile;
}

function getCommitMessage(commitFile, replaceAll) {
  const message = fse.readFileSync(commitFile, { encoding: 'utf8' });
  if (replaceAll) return message;
  const [firstline, ...body] = message.split(EOL);
  return { firstline, body };
}

function replaceTagByEmojiSymbol(accumulator, tag, emojiSymbol) {
  return accumulator.split(`:${tag}:`).join(emojiSymbol);
}

function getMatchingTags(content) {
  const matchingTags = content.match(TAG_REGEX);
  if (!matchingTags || !matchingTags.length) return null;
  const uniqMatchingTags = matchingTags
    .filter(filterUniqValuesInArray)
    .map(removeTagDoubleDotDelimiter);
  return uniqMatchingTags;
}

function replaceMatchingTagByEmojiSymbol(emojis) {
  return function reducing(acc, tag) {
    const emojiName = emojis[tag];
    if (!emojiName) return acc;
    const emojiSymbol = getEmojiSymbolByEmojiName(emojiName);
    const next = replaceTagByEmojiSymbol(acc, tag, emojiSymbol);
    return next;
  };
}

function replaceAllKeywordsOccurencesInMessage(previousContent, emojis) {
  const matchingTags = getMatchingTags(previousContent);
  if (!matchingTags) return previousContent;
  const newContent = matchingTags.reduce(
    replaceMatchingTagByEmojiSymbol(emojis),
    previousContent
  );
  return newContent;
}

function replaceFirstKeywordInMessage(previousContent, emojis) {
  const { firstline, body } = previousContent;
  const next = replaceAllKeywordsOccurencesInMessage(firstline, emojis);
  return [next, ...body].join(EOL);
}

function writeCommitMessageFile(commitFile, newContent) {
  fse.outputFileSync(commitFile, newContent, { encoding: 'utf8' });
}

function run(args, flags) {
  const emojis = getCurrentProjectEmojis();
  if (!emojis) return args.showHelp();

  const replaceAll = Boolean(flags.all || flags.a);
  const commitFile = getCommitFile();
  const previousContent = getCommitMessage(commitFile, replaceAll);
  const newContent = replaceAll
    ? replaceAllKeywordsOccurencesInMessage(previousContent, emojis)
    : replaceFirstKeywordInMessage(previousContent, emojis);
  writeCommitMessageFile(commitFile, newContent);
}

module.exports = run;
