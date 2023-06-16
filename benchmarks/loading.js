#!/usr/bin/env node

const { execSync } = require('node:child_process')

const RUNS = 50

const results = {}

for (let i = 0; i < RUNS; i++) {
   const output = execSync('node ./benchmarks/loading-runner.js').toString()
   output
      .trim()
      .split('\n')
      .forEach((line) => {
         const [name, result] = line.split(' ')
         results[name] = (results[name] || 0) + parseFloat(result)
      })
}

for (const name in results) {
   const prefix = name === 'colors' ? '+ ' : '  '
   const title = name.padEnd('kleur/colors  '.length)
   const time = (Math.round((1000 * results[name]) / RUNS) / 1000)
      .toString()
      .replace(/\.\d$/, '$&00')
      .replace(/\.\d\d$/, '$&0')
   process.stdout.write(`${prefix + title}\x1B[1m${time.padStart(6)}\x1B[22m ms\n`)
}
