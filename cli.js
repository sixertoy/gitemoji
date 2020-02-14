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
const exitWithSuccess = require('./src/exit-with-success');
const generateContributingFile = require('./src/generate-contrib');
const prepareCommitMessage = require('./src/prepare-commit-message');
const initGitmojoInProject = require('./src/init-gitmojo-in-project');

const {
  GITMOJO_FILE,
  HUKSY_COMMIT_MESSAGE_PARAM,
  TIME_COLOR,
  CWD,
  WS,
  USE_DEBUG,
  USE_TTY,
  DEFAULT_CONFIG_FILE,
} = require('./src/_constants');

const shouldUseHuskyHook = Boolean(HUKSY_COMMIT_MESSAGE_PARAM);

try {
  console.time(TIME_COLOR);
  args
    // TODO ajouter une option pour changer le EOL du fichier de commit git
    // Le EOL sert à splitter les lignes du commit message
    // Afin de pouvoir remplacer uniquement la premiere ligne du commit message
    .option('all', 'Replace all tags in commit message and body', false)
    .option('doc', 'Generate GITMOJO.md in current project', false)
    .command('init', 'Initialize GitMojo in your project', initGitmojoInProject)
    .example(
      'gitmojo init --doc',
      'Initialize GitMojo in your project and generate GTIMOJO.md'
    )
    .example(
      '"prepare-commit-message" : "gitmojo --all"',
      'Will replace all occurences in commit message, title and body'
    );
  const flags = args.parse(process.argv);
  const shouldGenerateGitmojoDoc = flags.doc || flags.d;
  if (shouldUseHuskyHook) {
    prepareCommitMessage(args);
  } else if (shouldGenerateGitmojoDoc) {
    const configFile = path.join(CWD, GITMOJO_FILE);
    generateContributingFile(configFile);
    const message = `GITMOJO.md generated with success${WS}`;
    exitWithSuccess(message);
  } else {
    args.showHelp();
  }
} catch (e) {
  if (!shouldUseHuskyHook && (e || e.message)) {
    const msg = `\u001b[31mError: ${e.message}\u001b[39m\n`;
    process.stderr.write(msg);
  }
  if (USE_TTY) {
    const msg = '\u001b[31m! Unexpected error has occurred\u001b[39m\n';
    process.stderr.write(msg);
  }
}
