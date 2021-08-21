import chalk from 'chalk'
import console from 'console'

const logger = {
  white(words: string) {
    console.log('>', chalk.white(words))
  },
  green(words: string) {
    console.log('>', chalk.green(words))
  },
  blue(words: string) {
    console.log('>', chalk.blue(words))
  },
  red(words: string) {
    console.log('>', chalk.red(words))
  },
  default: console.log,
}

export default logger
