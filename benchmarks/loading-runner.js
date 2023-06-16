const { performance } = require('node:perf_hooks')

let before
function showTime(name) {
   const after = performance.now()
   process.stdout.write(`${name} ${after - before}\n`)
}

before = performance.now()
const chalk = require('chalk')

showTime('chalk')

before = performance.now()
const cliColor = require('cli-color')

showTime('cli-color')

before = performance.now()
const ansi = require('ansi-colors')

showTime('ansi-colors')

before = performance.now()
const kleur = require('kleur')

showTime('kleur')

before = performance.now()
const kleurColors = require('kleur/colors')

showTime('kleur/colors')

before = performance.now()
const colorette = require('colorette')

showTime('colorette')

before = performance.now()
const nanocolors = require('nanocolors')

showTime('nanocolors')

before = performance.now()
const colors = require('../colors.js')

showTime('colors')
