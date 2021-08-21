import spawn from 'cross-spawn'

function run(command: string, commandArgs: string): void {
  const args = commandArgs.split(' ')
  spawn.sync(command, args, { stdio: 'inherit' })
}

export default run
