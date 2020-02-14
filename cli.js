/*
 *
 * @author Matthieu Lassalvy
 * @email sixertoy.github gmail
 * @repository https://github.com/sixertoy/gitmojo
 *
 * Install:
 * npm i -g gitmmojo
 *
 * Usage:
 * gitmmojo --help
 * gitmmojo --version
 * gitmmojo init
 * gitmmojo init --config=.gitmojorc
 *
 */
const path = require('path');
const args = require('args');
const initializeEmojiForCurrentProject = require('./src/init');
const {
  TIME_COLOR,
  USE_DEBUG,
  USE_TTY,
  DEFAULT_CONFIG_FILE,
} = require('./src/_constants');

try {
  console.time(TIME_COLOR);
  args
    .option('config', 'Emojis config file', DEFAULT_CONFIG_FILE)
    .option('docs', 'Generate contributing file based on config file', false)
    .command(
      'init',
      'Initialize hook in your project',
      initializeEmojiForCurrentProject,
      ['i']
    )
    .parse(process.argv);
  args.showHelp();
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
