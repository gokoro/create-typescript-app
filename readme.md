# Create-Typescript-App

## Getting Started

Go `Github > Settings > Developer settings > Personal access tokens` and generate token for Github packages. The token must have permissions: `repo`, `write:packages`, `read:packages`.

Open `~/.npmrc` and add:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
```

Run the command below:

```bash
npm_config_registry=https://npm.pkg.github.com npx @gokoro/create-typescript-app my-new-project
```

It'll generate the directory for the new project and install the packages and configs automatically.

## Used Stacks

- [Yarn berry](https://github.com/yarnpkg/berry)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [swc](https://github.com/swc-project/swc)
