# GitMojo

> Gitmojo hook, replace tag into your commit messages to emojis

## Install

```bash
git clone git@github.com:sixertoy/gitmojo.git
yarn link
# or npm link
```

## Usage

Install Gitmojo in your project

```bash
cd  myproject
gitmojo init
# gitmojo init --config=.gitmojorc
```

Update your `package.json` with husky configuration

```
{
  ...
  "husky": {
    "hooks": {
      "prepare-commit-msg": "",
      "...": "..."
    }
  }
  ...
}
```

Customize `./.gitmojorc.json` to fit your needs

## Defaults emojis

> See CONTRIBUTING.md

## TODOS

[] check if husky package is installed
