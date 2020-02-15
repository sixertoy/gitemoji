# GitMojo

[![NPM version][npm-version-img]][npm-url]
[![Build Status][travis-status-img]][travis-url]

**Emojilify all the things \o/**

## Install

#### Install GitMojo globally

```bash
yarn global add gitmojo
# or npm install gitmojo -g
```

#### Initialize GitMojo in your project

```bash
cd  my-project
gitmojo init --doc
# gitmojo init
```

#### Husky's hook configuration

Update `Husky's` configuration with `prepare-commit-msg` git hook

```
"husky": {
  "hooks": {
    "prepare-commit-msg": "gitmojo --all"
  }
}
```

## Defaults Emojis

See [GITMOJO.md](./GITMOJO.md) for defaults emojis<br>
Edit `.gitmojorc.json` in you project to fit your needs<br>
Use `gitmojo -d` to regenerate the documentation file

## Requirements

- [NodeJS >= 12.13.1](https://www.nodejs.org/api)
- [Husky >= 4.2.3](https://www.npmjs.com/package/husky)

## TODOS

- [] check if Husky package is installed
- [] debug with windows EOL
- [] remove usage of husky

[npm-url]: https://npmjs.org/package/gitmojo
[npm-version-img]: http://img.shields.io/npm/v/gitmojo.svg?style=flat-square
[travis-url]: (https://travis-ci.org/sixertoy/gitmojo)
[travis-status-img]: (https://travis-ci.org/sixertoy/gitmojo.svg?branch=master)
