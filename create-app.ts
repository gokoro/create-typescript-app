import mkdirp from 'mkdirp'
import cpy from 'cpy'
import fs from 'fs'
import os from 'os'
import path from 'path'
import spawn from './lib/cross-spawn'
import logger from './lib/logger'

async function createApp(installPath: string): Promise<void> {
  const absolutePath = path.resolve(installPath)

  // Create project directory
  logger.default('')
  logger.white('Creating project folder...')

  await mkdirp(absolutePath)
  process.chdir(absolutePath)

  // Create package.json
  logger.default('')
  logger.white('Creating package.json...')

  const packageJson = {
    name: 'typescript-app',
    version: '0.1.0',
    private: true,
    scripts: {
      start: 'ts-node src/main.ts',
      build: 'tsc',
      lint: 'eslint . --ext .ts',
    },
  }

  fs.writeFileSync(
    'package.json',
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  // Setup yarn berry
  logger.default('')
  logger.white('Setting up yarn berry...')
  logger.default('')

  spawn('yarn', 'set version berry')

  // Install development dependencies
  logger.default('')
  logger.white('Installing development dependencies...')
  logger.default('')

  const devDependencies = [
    '@swc/core',
    '@types/node',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'eslint-import-resolver-node',
    'eslint-plugin-import',
    'ts-node',
    'typescript',
  ]

  spawn('yarnpkg', `add -D --exact ${devDependencies.join(' ')}`)

  // Setup yarn berry sdk for vscode
  logger.default('')
  logger.white('Setting up yarn berry sdk for vscode...')
  logger.default('')

  spawn('yarn', 'dlx @yarnpkg/sdks vscode')

  // Add plugins for yarn berry
  logger.default('')
  logger.white('Adding plugins for yarn berry...')
  logger.default('')

  spawn('yarn', 'plugin import typescript')

  // Copy config files from template
  logger.default('')
  logger.white('Copying config files from template...')

  await cpy('**', absolutePath, {
    parents: true,
    cwd: path.join(__dirname, 'templates'),
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.js': {
          return '.'.concat(name)
        }
        default: {
          return name
        }
      }
    },
  })

  // Initialize git repository
  logger.default('')
  logger.white('Initializing git repository...')

  spawn('git', 'init')
}

export default createApp
