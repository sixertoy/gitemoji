#!/usr/env/bin node

const fs = require('fs');
const path = require('path');
const emoji = require('emojilib');
const tablemark = require('tablemark');

const EMOJIS_JSON_MAP = require('./emojis.json');
const HOOK_OUTPUT_FOLDER = path.join(__dirname, 'build');
const HOOK_TEMPLATE_FILE = path.join(__dirname, 'prepare-commit-msg.tpl');

const REPLACER_JOKER = '%%BASH_ARRAY%%';
const CONTRIBUTING_FILENAME = 'CONTRIBUTING.md';

function getSymbolByType(input) {
  const firstchar = input.charAt(0);
  const isalpha = /^[a-z]$/.test(firstchar);
  if (isalpha) return emoji.lib[input].char;
  return input;
}

function generateMarkdownTable(emojiMap) {
  const table = emojiMap.map(function getEntryArraySymbol({ keyword, tag }) {
    const symbol = getSymbolByType(tag);
    return { keyword, tag, symbol };
  });
  return tablemark(table);
}

function generateBashArrayEntries(emojiMap) {
  const bashArray = emojiMap
    .map(function getEntryArraySymbol({ keyword, tag }) {
      const symbol = getSymbolByType(tag);
      return { keyword, symbol };
    })
    .map(function getBashArrayEntry({ keyword, symbol }) {
      return `":${keyword}:/${symbol}"`;
    })
    .map(function addWhitespaceBeforeArrayEntry(str) {
      return `  ${str}`;
    })
    .join('\n');
  return bashArray;
}

function getTemplateContent(templateFile) {
  const templateContent = fs.readFileSync(templateFile, { encoding: 'utf8' });
  return templateContent;
}

function replaceTemplateJoker(input, value, joker) {
  const outputContent = input.replace(joker, value);
  return outputContent;
}

function getHookOutputFilename(inputFilename) {
  const basename = path.basename(inputFilename);
  const [filename] = basename.split('.');
  return filename;
}

function writeOuputFile(content, outputFilename, outputFolder) {
  try {
    fs.mkdirSync(outputFolder, { recursive: true });
  } catch (err) {}
  const outputFile = path.join(outputFolder, outputFilename);
  fs.writeFileSync(outputFile, content, { encoding: 'utf8' });
}

function run(emojiMap, inputFilename, outputFolder, joker, readmeFilename) {
  const bashArray = generateBashArrayEntries(emojiMap);
  const templateContent = getTemplateContent(inputFilename);
  const hookFilename = getHookOutputFilename(inputFilename);
  const outputContent = replaceTemplateJoker(templateContent, bashArray, joker);
  writeOuputFile(outputContent, hookFilename, outputFolder);
  const markdownTable = generateMarkdownTable(emojiMap);
  writeOuputFile(markdownTable, readmeFilename, outputFolder);
}

run(
  EMOJIS_JSON_MAP,
  HOOK_TEMPLATE_FILE,
  HOOK_OUTPUT_FOLDER,
  REPLACER_JOKER,
  CONTRIBUTING_FILENAME
);
