#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

const benchmark = require('benchmark')
const colorette = require('colorette')
const kleur = require('kleur')
const kleurColors = require('kleur/colors')
const chalk = require('chalk')
const ansi = require('ansi-colors')
const cliColor = require('cli-color')
const nanocolors = require('nanocolors')
const colors = require('../colors.js')

function formatNumber(number) {
   return String(number)
      .replace(/\d{3}$/, ',$&')
      .replace(/^(\d|\d\d)(\d{3},)/, '$1,$2')
}

const suite = new benchmark.Suite()
let out

let index = 1e8

suite
   .add('chalk', () => {
      out
         = chalk.red('.')
         + chalk.yellow('.')
         + chalk.green('.')
         + chalk.bgRed(chalk.black(' ERROR '))
         + chalk.red(
            ` Add plugin ${chalk.yellow('name')} to use time limit with ${chalk.yellow(++index)}`,
         )
   })
   .add('cli-color', () => {
      out
         = cliColor.red('.')
         + cliColor.yellow('.')
         + cliColor.green('.')
         + cliColor.bgRed(cliColor.black(' ERROR '))
         + cliColor.red(
            ` Add plugin ${
                cliColor.yellow('name')
                } to use time limit with ${
                cliColor.yellow(++index)}`,
         )
   })
   .add('ansi-colors', () => {
      out
         = ansi.red('.')
         + ansi.yellow('.')
         + ansi.green('.')
         + ansi.bgRed(ansi.black(' ERROR '))
         + ansi.red(
            ` Add plugin ${ansi.yellow('name')} to use time limit with ${ansi.yellow(++index)}`,
         )
   })
   .add('kleur', () => {
      out
         = kleur.red('.')
         + kleur.yellow('.')
         + kleur.green('.')
         + kleur.bgRed(kleur.black(' ERROR '))
         + kleur.red(
            ` Add plugin ${kleur.yellow('name')} to use time limit with ${kleur.yellow(++index)}`,
         )
   })
   .add('kleur/colors', () => {
      out
         = kleurColors.red('.')
         + kleurColors.yellow('.')
         + kleurColors.green('.')
         + kleurColors.bgRed(kleurColors.black(' ERROR '))
         + kleurColors.red(
            ` Add plugin ${
                kleurColors.yellow('name')
                } to use time limit with ${
                kleurColors.yellow(++index)}`,
         )
   })
   .add('colorette', () => {
      out
         = colorette.red('.')
         + colorette.yellow('.')
         + colorette.green('.')
         + colorette.bgRed(colorette.black(' ERROR '))
         + colorette.red(
            ` Add plugin ${
                colorette.yellow('name')
                } to use time limit with ${
                colorette.yellow(++index)}`,
         )
   })
   .add('nanocolors', () => {
      out
         = nanocolors.red('.')
         + nanocolors.yellow('.')
         + nanocolors.green('.')
         + nanocolors.bgRed(nanocolors.black(' ERROR '))
         + nanocolors.red(
            ` Add plugin ${
                nanocolors.yellow('name')
                } to use time limit with ${
                nanocolors.yellow(++index)}`,
         )
   })
   .add('colors', () => {
      out
      = colors.red('.')
      + colors.yellow('.')
      + colors.green('.')
      + colors.bgRed(colors.black(' ERROR '))
      + colors.red(
         ` Add plugin ${
             colors.yellow('name')
                } to use time limit with ${
                colors.yellow(`${++index}`)}`,
      )
   })
   .on('cycle', (event) => {
      const prefix = event.target.name === 'colors' ? '+ ' : '  '
      const name = event.target.name.padEnd('kleur/colors  '.length)
      const hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
      process.stdout.write(`${prefix}${name}${colors.bold(hz)} ops/sec\n`)
   })
   .on('error', (event) => {
      process.stderr.write(`${colors.red(event.target.error.toString())}\n`)
      process.exit(1)
   })
   .run()
