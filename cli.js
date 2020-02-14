/*
 *
 * @author Matthieu Lassalvy
 * @email sixertoy.github gmail
 * @repository https://github.com/sixertoy/gitmojo
 *
 * Install:
 * npm i -g gitmojo
 *
 * Usage:
 * gitmojo --help
 * gitmojo --version
 * gitmojo init
 * gitmojo init --config=.gitmojorc
 *
 */
const path = require('path');
const args = require('args');
const initializeEmojiForCurrentProject = require('./src/init');
const prepareCommitMessage = require('./src/prepare-commit-message');

const {
  TIME_COLOR,
  USE_DEBUG,
  USE_TTY,
  DEFAULT_CONFIG_FILE,
} = require('./src/_constants');

try {
  console.time(TIME_COLOR);
  args
    // .option('win', 'Use EOL windows style into commit message', false)
    .option('all', 'Replace all tags in commit message and body', false)
    .option('config', 'Emojis config file', DEFAULT_CONFIG_FILE)
    .option('no-docs', 'Do not generate contributing file at init', false)
    .command(
      'init',
      'Initialize hook in your project',
      initializeEmojiForCurrentProject,
      ['i']
    )
    .parse(process.argv);
  prepareCommitMessage(args);
} catch (e) {
  if (USE_DEBUG) {
    const msg = `\u001b[31m${e}\u001b[39m\n`;
    process.stderr.write(msg);
  }
  if (USE_TTY) {
    const msg = '\u001b[31m! Unexpected error has occurred\u001b[39m\n';
    process.stderr.write(msg);
  }
  process.exit(1);
}
