const vm = require('node:vm')
const fs = require('node:fs')
const assert = require('node:assert')
const consolji = require('consolji')
const nc = require('../colors.js')

const source = fs.readFileSync(`${__dirname}/../colors.js`, 'utf-8')

test('ci server', () => {
   const nc = initModuleEnv({ env: { TERM: 'dumb', CI: '1' } })
   assert.equal(nc.isColorSupported, true)
   assert.equal(nc.red('text'), nc.createColors(true).red('text'))
})

test('arg --color', () => {
   const nc = initModuleEnv({ env: { TERM: 'dumb' }, argv: ['--color'] })
   assert.equal(nc.isColorSupported, true)
   assert.equal(nc.red('text'), nc.createColors(true).red('text'))
})

test('env NO_COLOR', () => {
   const nc = initModuleEnv({ env: { FORCE_COLOR: '1', NO_COLOR: '1' } })
   assert.equal(nc.isColorSupported, false)
   assert.equal(nc.red('text'), nc.createColors(false).red('text'))
})

test('env FORCE_COLOR', () => {
   const nc = initModuleEnv({ env: { TERM: 'dumb', FORCE_COLOR: '1' } })
   assert.equal(nc.isColorSupported, true)
   assert.equal(nc.red('text'), nc.createColors(true).red('text'))
})

test('arg --no-color', () => {
   const nc = initModuleEnv({ env: { FORCE_COLOR: '1' }, argv: ['--no-color'] })
   assert.equal(nc.isColorSupported, false)
   assert.equal(nc.red('text'), nc.createColors(false).red('text'))
})

test('no term', () => {
   const nc = initModuleEnv({ env: { TERM: 'dumb' } })
   assert.equal(nc.isColorSupported, false)
   assert.equal(nc.red('text'), nc.createColors(false).red('text'))
})

test('windows', () => {
   const nc = initModuleEnv({ env: { TERM: 'dumb' }, platform: 'win32' })
   assert.equal(nc.isColorSupported, true)
   assert.equal(nc.red('text'), nc.createColors(true).red('text'))
})

function test(name, fn) {
   try {
      fn()
      consolji.log(nc.green(`✓ ${name}`))
   }
   catch (error) {
      consolji.log(nc.red(`✗ ${name}`))
      throw error
   }
}

function initModuleEnv({ env, argv = [], platform = 'darwin' }) {
   const process = { env, argv, platform }
   const context = vm.createContext({ require, process, module: { exports: {} } })
   const script = new vm.Script(source)
   script.runInContext(context)
   return context.module.exports
}
