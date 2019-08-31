#!/usr/env/bin node

const fs = require('fs');
const path = require('path');

const EMOJIS_JSON_MAP = require('./emojis.json');
const HOOK_OUTPUT_FOLDER = path.join(__dirname, 'build');
const HOOK_TEMPLATE_FILE = path.join(__dirname, 'prepare-commit-msg.tpl');

const REPLACER_JOKER = '%%BASH_ARRAY%%';

function generateBashArray(emojiMap) {
  const bashArray = Object.keys(emojiMap)
    .map(keyword => ({ keyword, value: emojiMap[keyword] }))
    .map(({ keyword, value }) => `:${keyword}:/:${value}:`)
    .map(str => `  ${str}`)
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

function writeOutputHookFile(content) {
  const outputFile = path.join(HOOK_OUTPUT_FOLDER, 'prepare-commit-msg');
  fs.writeFileSync(outputFile, content, { encoding: 'utf8' });
}

function run(emojiMap, inputFilename, outputFolder, joker) {
  const bashArray = generateBashArray(emojiMap);
  const templateContent = getTemplateContent(inputFilename);
  const outputContent = replaceTemplateJoker(templateContent, bashArray, joker);
  writeOutputHookFile(outputContent);
}

run(EMOJIS_JSON_MAP, HOOK_TEMPLATE_FILE, HOOK_OUTPUT_FOLDER, REPLACER_JOKER);
