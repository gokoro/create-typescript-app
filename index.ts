#!/usr/bin/env node

import Commander from 'commander'
import npmPackage from './package.json'

import logger from './lib/logger'
import createApp from './create-app'

let pathToInstall: string = ''

new Commander.Command(npmPackage.name)
  .version(npmPackage.version)
  .arguments('<path>')
  .action((path) => {
    pathToInstall = path
  })
  .parse(process.argv)

async function run(): Promise<void> {
  logger.white('Start creating typescript app from templates...')

  await createApp(pathToInstall)

  logger.default('')
  logger.green('Done! Code yourself!')
}

run()
