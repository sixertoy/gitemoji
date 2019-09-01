#!/usr/env/bin node

const fs = require('fs');
const path = require('path');
const emoji = require('emojilib');

const EMOJIS_JSON_MAP = require('./emojis.json');
const HOOK_OUTPUT_FOLDER = path.join(__dirname, 'build');
const HOOK_TEMPLATE_FILE = path.join(__dirname, 'prepare-commit-msg.tpl');

const REPLACER_JOKER = '%%BASH_ARRAY%%';

function getSymbolByType(input) {
  const firstchar = input.charAt(0);
  const isalpha = /^[a-z]$/.test(firstchar);
  if (isalpha) return emoji.lib[input].char;
  return input;
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

function writeHookFile(content, inputFilename, outputFolder) {
  try {
    fs.mkdirSync(outputFolder, { recursive: true });
  } catch (err) {}
  const basename = path.basename(inputFilename);
  const [filename] = basename.split('.');
  const outputFile = path.join(outputFolder, filename);
  fs.writeFileSync(outputFile, content, { encoding: 'utf8' });
}

function run(emojiMap, inputFilename, outputFolder, joker) {
  const bashArray = generateBashArrayEntries(emojiMap);
  const templateContent = getTemplateContent(inputFilename);
  const outputContent = replaceTemplateJoker(templateContent, bashArray, joker);
  writeHookFile(outputContent, inputFilename, outputFolder);
}

run(EMOJIS_JSON_MAP, HOOK_TEMPLATE_FILE, HOOK_OUTPUT_FOLDER, REPLACER_JOKER);
