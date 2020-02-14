# GitMojo

[![NPM version][npm-version-img]][npm-url]

**Emojilify all the things \o/**

## Requirements

- NodeJS >= 12.13.1
- [Husky >= 4.2.3](https://www.npmjs.com/package/husky)

## Install

GitMojo need to be installed globally

```bash
yarn global add gitmojo
# or npm install gitmojo -g
```

#### Initialize GitMojo in your project

```bash
cd  my-project
gitmojo init
```

Edit `.gitmojorc.json` to fit your needs

#### Husky's hook configuration

Update `Husky's` configuration with `prepare-commit-msg` hook

```
{
  "husky": {
    "hooks": {
      "prepare-commit-msg": "gitmojo"
    }
  }
}
```

## Defaults Emojis

See [GITMOJO.md](./GITMOJO.md)

## TODOS

- [] check if Husky package is installed
- [] debug with windows EOL

[npm-url]: https://npmjs.org/package/gitmojo
[npm-version-img]: http://img.shields.io/npm/v/gitmojo.svg?style=flat-square
