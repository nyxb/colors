const tty = require('node:tty')

const isColorSupported
   = !('NO_COLOR' in process.env || process.argv.includes('--no-color'))
   && ('FORCE_COLOR' in process.env
      || process.argv.includes('--color')
      || process.platform === 'win32'
      || (tty.isatty(1) && process.env.TERM !== 'dumb')
      || 'CI' in process.env)

function formatter(open, close, replace = open) {
   return (input) => {
      const string = `${input}`
      const index = string.indexOf(close, open.length)
      return ~index
         ? open + replaceClose(string, close, replace, index) + close
         : open + string + close
   }
}

let replaceClose = (string, close, replace, index) => {
   const start = string.substring(0, index) + replace
   const end = string.substring(index + close.length)
   const nextIndex = end.indexOf(close)
   return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
}

function createColors(enabled = isColorSupported) {
   return {
      isColorSupported: enabled,
      reset: enabled ? s => `\x1B[0m${s}\x1B[0m` : String,
      bold: enabled ? formatter('\x1B[1m', '\x1B[22m', '\x1B[22m\x1B[1m') : String,
      dim: enabled ? formatter('\x1B[2m', '\x1B[22m', '\x1B[22m\x1B[2m') : String,
      italic: enabled ? formatter('\x1B[3m', '\x1B[23m') : String,
      underline: enabled ? formatter('\x1B[4m', '\x1B[24m') : String,
      inverse: enabled ? formatter('\x1B[7m', '\x1B[27m') : String,
      hidden: enabled ? formatter('\x1B[8m', '\x1B[28m') : String,
      strikethrough: enabled ? formatter('\x1B[9m', '\x1B[29m') : String,
      black: enabled ? formatter('\x1B[30m', '\x1B[39m') : String,
      red: enabled ? formatter('\x1B[31m', '\x1B[39m') : String,
      green: enabled ? formatter('\x1B[32m', '\x1B[39m') : String,
      yellow: enabled ? formatter('\x1B[33m', '\x1B[39m') : String,
      blue: enabled ? formatter('\x1B[34m', '\x1B[39m') : String,
      magenta: enabled ? formatter('\x1B[35m', '\x1B[39m') : String,
      cyan: enabled ? formatter('\x1B[36m', '\x1B[39m') : String,
      white: enabled ? formatter('\x1B[37m', '\x1B[39m') : String,
      gray: enabled ? formatter('\x1B[90m', '\x1B[39m') : String,
      bgBlack: enabled ? formatter('\x1B[40m', '\x1B[49m') : String,
      bgRed: enabled ? formatter('\x1B[41m', '\x1B[49m') : String,
      bgGreen: enabled ? formatter('\x1B[42m', '\x1B[49m') : String,
      bgYellow: enabled ? formatter('\x1B[43m', '\x1B[49m') : String,
      bgBlue: enabled ? formatter('\x1B[44m', '\x1B[49m') : String,
      bgMagenta: enabled ? formatter('\x1B[45m', '\x1B[49m') : String,
      bgCyan: enabled ? formatter('\x1B[46m', '\x1B[49m') : String,
      bgWhite: enabled ? formatter('\x1B[47m', '\x1B[49m') : String,
      nyxbpurple: enabled ? formatter('\x1B[38;2;153;69;255m', '\x1B[39m') : String,
      nyxbgreen: enabled ? formatter('\x1B[38;2;20;241;149m', '\x1B[39m') : String,
      nyxbcyan: enabled ? formatter('\x1B[38;2;0;255;255m', '\x1B[39m') : String,
      nyxbblue: enabled ? formatter('\x1B[38;2;88;101;242m', '\x1B[39m') : String,
      nyxbyellow: enabled ? formatter('\x1B[38;2;254;231;92m', '\x1B[39m') : String,
      nyxbfox: enabled ? formatter('\x1B[38;2;235;69;158m', '\x1B[39m') : String,
      nyxbred: enabled ? formatter('\x1B[38;2;237;66;69m', '\x1B[39m') : String,
   }
}

module.exports = createColors()
module.exports.createColors = createColors
