#!/usr/bin/env node
const program = require('commander')
const version = require('./package.json').version;
const chalk = require('chalk')
const figlet = require('figlet')
const paths = require('./paths')

const questions = [
  {
    type : 'input',
    name : 'name',
    message : 'Enter reducer name ...'
  }
]

console.log(
  chalk.yellow(
    figlet.textSync('Regen', { horizontalLayout: 'full' })
  )
);

program
  .version(version)
  .option('-r, --root [path]', 'The root path of your redux application', paths.rootDir)
  .option('-p, --path [path]', 'The path you want to save the files to', './')
  .description('redux generator')

  require('./commands/make')

program.parse(process.argv)

