const assert = require('node:assert')
const consolji = require('consolji')
const nc = require('../colors.js')

const FMT = {
   reset: ['\x1B[0m', '\x1B[0m'],
   bold: ['\x1B[1m', '\x1B[22m'],
   dim: ['\x1B[2m', '\x1B[22m'],
   italic: ['\x1B[3m', '\x1B[23m'],
   underline: ['\x1B[4m', '\x1B[24m'],
   inverse: ['\x1B[7m', '\x1B[27m'],
   hidden: ['\x1B[8m', '\x1B[28m'],
   strikethrough: ['\x1B[9m', '\x1B[29m'],
   black: ['\x1B[30m', '\x1B[39m'],
   red: ['\x1B[31m', '\x1B[39m'],
   green: ['\x1B[32m', '\x1B[39m'],
   yellow: ['\x1B[33m', '\x1B[39m'],
   blue: ['\x1B[34m', '\x1B[39m'],
   magenta: ['\x1B[35m', '\x1B[39m'],
   cyan: ['\x1B[36m', '\x1B[39m'],
   white: ['\x1B[37m', '\x1B[39m'],
   gray: ['\x1B[90m', '\x1B[39m'],
   nyxbpurple: ['\x1B[38;2;153;69;255m', '\x1B[39m'],
   nyxbgreen: ['\x1B[38;2;20;241;149m', '\x1B[39m'],
   nyxbcyan: ['\x1B[38;2;0;255;255m', '\x1B[39m'],
   nyxbblue: ['\x1B[38;2;88;101;242m', '\x1B[39m'],
   nyxbyellow: ['\x1B[38;2;254;231;92m', '\x1B[39m'],
   nyxbfox: ['\x1B[38;2;235;69;158m', '\x1B[39m'],
   nyxbred: ['\x1B[38;2;237;66;69m', '\x1B[39m'],
   bgBlack: ['\x1B[40m', '\x1B[49m'],
   bgRed: ['\x1B[41m', '\x1B[49m'],
   bgGreen: ['\x1B[42m', '\x1B[49m'],
   bgYellow: ['\x1B[43m', '\x1B[49m'],
   bgBlue: ['\x1B[44m', '\x1B[49m'],
   bgMagenta: ['\x1B[45m', '\x1B[49m'],
   bgCyan: ['\x1B[46m', '\x1B[49m'],
   bgWhite: ['\x1B[47m', '\x1B[49m'],
}

test('color matching', () => {
   for (const format in FMT) {
      assert.equal(nc[format]('string'), `${FMT[format][0]}string${FMT[format][1]}`)
      consolji.log(nc[format](`testing: ${format}`))
   }
})

test('format/color nesting', () => {
   assert.equal(
      nc.bold(`BOLD ${nc.red(`RED ${nc.dim('DIM')} RED`)} BOLD`),
      `${FMT.bold[0]
         }BOLD ${
         FMT.red[0]
         }RED ${
         FMT.dim[0]
         }DIM${
         FMT.dim[1]
         }${FMT.bold[0]
         } RED${
         FMT.red[1]
         } BOLD${
         FMT.bold[1]}`,
   )
})

test('proper wrapping', () => {
   assert.equal(
      nc.red(nc.bold('==TEST==')),
      `${FMT.red[0] + FMT.bold[0]}==TEST==${FMT.bold[1]}${FMT.red[1]}`,
   )
})

test('complex case of wrapping', () => {
   assert.equal(
      nc.bold(nc.yellow(nc.bgRed(nc.italic('==TEST==')))),
      `${FMT.bold[0]
         + FMT.yellow[0]
         + FMT.bgRed[0]
         + FMT.italic[0]
         }==TEST==${
         FMT.italic[1]
         }${FMT.bgRed[1]
         }${FMT.yellow[1]
         }${FMT.bold[1]}`,
   )

   assert.equal(
      nc.cyan(nc.bold(nc.underline('==TEST=='))),
      `${FMT.cyan[0]
         + FMT.bold[0]
         + FMT.underline[0]
         }==TEST==${
         FMT.underline[1]
         }${FMT.bold[1]
         }${FMT.cyan[1]}`,
   )
})

test('close sequence replacement', () => {
   assert.equal(
      nc.red(`foo ${nc.yellow('bar')} baz`),
      `${FMT.red[0]}foo ${FMT.yellow[0]}bar${FMT.red[0]} baz${FMT.red[1]}`,
   )

   assert.equal(
      nc.bold(`foo ${nc.red(nc.dim('bar'))} baz`),
      `${FMT.bold[0]
         }foo ${
         FMT.red[0]
         }${FMT.dim[0]
         }bar${
         FMT.dim[1]
         }${FMT.bold[0]
         }${FMT.red[1]
         } baz${
         FMT.bold[1]}`,
   )

   assert.equal(
      nc.yellow(`foo ${nc.red(nc.bold('red'))} bar ${nc.cyan('cyan')} baz`),
      `${FMT.yellow[0]
         }foo ${
         FMT.red[0]
         }${FMT.bold[0]
         }red${
         FMT.bold[1]
         }${FMT.yellow[0]
         } bar ${
         FMT.cyan[0]
         }cyan${
         FMT.yellow[0]
         } baz${
         FMT.yellow[1]}`,
   )
})

test('non-string input', () => {
   assert.equal(nc.red(), `${FMT.red[0]}undefined${FMT.red[1]}`)
   assert.equal(nc.red(undefined), `${FMT.red[0]}undefined${FMT.red[1]}`)
   assert.equal(nc.red(0), `${FMT.red[0]}0${FMT.red[1]}`)
   assert.equal(nc.red(NaN), `${FMT.red[0]}NaN${FMT.red[1]}`)
   assert.equal(nc.red(null), `${FMT.red[0]}null${FMT.red[1]}`)
   assert.equal(nc.red(true), `${FMT.red[0]}true${FMT.red[1]}`)
   assert.equal(nc.red(false), `${FMT.red[0]}false${FMT.red[1]}`)
   assert.equal(nc.red(Infinity), `${FMT.red[0]}Infinity${FMT.red[1]}`)
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
