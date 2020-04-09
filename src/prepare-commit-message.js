const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const isGitSubmodule = require('./is-git-submodule');
const getCurrentProjectEmojis = require('./get-current-project-emojis');
const getEmojiSymbolByEmojiName = require('./get-emoji-symbol-by-emoji-name');
const {
  CWD,
  EOL,
  TAG_REGEX,
  GIT_SOURCE,
  GIT_MESSAGE_FILE,
} = require('./_constants');

function filterUniqValuesInArray(v, i, a) {
  return a.indexOf(v) === i;
}

function removeTagDoubleDotDelimiter(tag) {
  return tag.split(':').join('');
}

function getArrayElementAt(array, ind = 0) {
  if (!array || !Array.isArray(array)) return null;
  const len = array.length;
  if (ind > len - 1) return null;
  return array[ind];
}

function getFirstLine(filepath) {
  const lineEnding = '\n';
  const encoding = 'utf8';
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filepath, { encoding });
    let acc = '';
    let pos = 0;
    let index;
    rs.on('data', chunk => {
      index = chunk.indexOf(lineEnding);
      acc += chunk;
      if (index === -1) {
        pos += chunk.length;
      } else {
        pos += index;
        rs.close();
      }
    })
      .on('close', () =>
        resolve(acc.slice(acc.charCodeAt(0) === 0xfeff ? 1 : 0, pos))
      )
      .on('error', err => reject(err));
  });
}

function getCommitHookForRepository(filepath) {
  const commitFile = path.join(filepath, GIT_MESSAGE_FILE);
  const isFile = fs.lstatSync(commitFile).isFile();
  if (!isFile) {
    const msg = 'GitMojo: Unable to find commit message file';
    throw new Error(msg);
  }
  return Promise.resolve(commitFile);
}

function getCommitHookForSubmodule(filepath) {
  return getFirstLine(filepath)
    .then(firstLine => {
      const hasSplitter = firstLine.indexOf(':') > 0;
      if (!hasSplitter) throw new Error('error');
      let relativePath = firstLine.split(':');
      relativePath = getArrayElementAt(relativePath, 1);
      if (!relativePath) throw new Error('error');
      const commitFile = path.join(CWD, relativePath.trim(), GIT_MESSAGE_FILE);
      return commitFile;
    })
    .catch(() => {
      const msg = 'GitMojo: Unable to manage git submodules';
      throw new Error(msg);
    });
}

function getCommitFile() {
  let filepath = path.join(CWD, GIT_SOURCE);
  const pathExists = fse.pathExistsSync(filepath);
  if (!pathExists) {
    const msg = 'GitMojo: Not a git repository';
    throw new Error(msg);
  }
  let isSubmodule = isGitSubmodule(filepath);
  if (isSubmodule) return getCommitHookForSubmodule(filepath);
  return getCommitHookForRepository(filepath);
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

async function run(args, flags) {
  const emojis = getCurrentProjectEmojis();
  if (!emojis) {
    const msg = 'Missing GitMojo config file in current project';
    throw new Error(msg);
  }

  const replaceAll = Boolean(flags.all || flags.a);
  const commitFile = await getCommitFile();
  const previousContent = getCommitMessage(commitFile, replaceAll);
  const newContent = replaceAll
    ? replaceAllKeywordsOccurencesInMessage(previousContent, emojis)
    : replaceFirstKeywordInMessage(previousContent, emojis);
  writeCommitMessageFile(commitFile, newContent);
  return true;
}

module.exports = run;
