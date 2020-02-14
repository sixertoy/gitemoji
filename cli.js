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

const USE_DEBUG = true;
const USE_TTY = process.stderr.isTTY;

function initializeEmojiForCurrentProject(name, sub, options) {
  const configFile = options.config;
  console.log('configFile', configFile);
  process.exit(0);
}

try {
  args
    .option('config', 'Emojis config file', '.gitmojorc')
    .command(
      'init',
      'Initialize hook in your project',
      initializeEmojiForCurrentProject,
      ['i']
    )
    .example('gitmojo init', 'Initialize your project with gitmojo hook')
    .parse(process.argv);
  args.showHelp();
} catch (e) {
  if (USE_DEBUG) error(`error >>> ${e}\n`);
  if (USE_TTY) error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  process.exit(1);
}
