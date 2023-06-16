# @nyxb/colors

The tiniest and the fastest library for terminal output formatting with ANSI && RGB colors.

```javascript
import nc from "@nyxb/colors"

console.log(
  nc.green(`How are ${c.italic(`you`)} doing?`)
)
```

- **No dependencies.**
- **14 times** smaller and **2 times** faster than chalk.
- Used by popular tools like PostCSS, SVGO, Stylelint, and Browserslist.
- Node.js v6+ & browsers support. Support for both CJS and ESM projects.
- TypeScript type declarations included.
- [`NO_COLOR`](https://no-color.org/) friendly.

## Motivation

With `@nyxb/colors` we are trying to draw attention to the `node_modules` size
problem and promote performance-first culture.

## Prior Art

Credits go to the following projects:

- [Nanocolors](https://github.com/ai/nanocolors) by [@ai](https://github.com/ai)
- [Colorette](https://github.com/jorgebucaran/colorette) by [@jorgebucaran](https://github.com/jorgebucaran)
- [Kleur](https://github.com/lukeed/kleur) by [@lukeed](https://github.com/lukeed)
- [Colors.js](https://github.com/Marak/colors.js) by [@Marak](https://github.com/Marak)
- [Chalk](https://github.com/chalk/chalk) by [@sindresorhus](https://github.com/sindresorhus)

## Benchmarks

The space in node_modules including sub-dependencies:

```diff
$ node ./benchmarks/size.js
Data from packagephobia.com
  chalk        43 kB
  cli-color   796 kB
  ansi-colors  27 kB
  kleur        20 kB
  colorette    17 kB
  nanocolors   15 kB
+ colors       39 kB
```

Library loading time:

```diff
$ node ./benchmarks/loading.js
  chalk          3.024 ms
  cli-color     18.894 ms
  ansi-colors    0.821 ms
  kleur          1.171 ms
  kleur/colors   0.581 ms
  colorette      0.529 ms
  nanocolors     0.319 ms
+ colors         0.157 ms
```

Benchmark for simple use case:

```diff
$ node ./benchmarks/simple.js
  chalk         48,283,199 ops/sec
  cli-color      2,591,647 ops/sec
  ansi-colors   13,762,906 ops/sec
  kleur         52,427,142 ops/sec
  kleur/colors  66,904,098 ops/sec
  colorette     66,570,482 ops/sec
  nanocolors    87,642,042 ops/sec
+ colors        86,856,783 ops/sec
```

Benchmark for complex use cases:

```diff
$ node ./benchmarks/complex.js
  chalk          2,113,896 ops/sec
  cli-color        292,431 ops/sec
  ansi-colors    1,117,678 ops/sec
  kleur          2,397,329 ops/sec
  kleur/colors   2,685,299 ops/sec
  colorette      2,907,371 ops/sec
  nanocolors     3,119,996 ops/sec
+ colors         5,292,435 ops/sec
```

## Usage

@nyxb/colors provides an object which includes a variety of text coloring and formatting functions

```javascript
import nc from "@nyxb/colors"
```

The object includes following coloring functions: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` and special colors from nyxb brand `nyxbgreen` `nyxbblue` `nyxbfox` `nyxbpurple` `nyxbyellow` `nyxbred` `nyxbcyan`.

```javascript
console.log(`I see a ${nc.red("red door")} and I want it painted ${nc.black("black")}`)
```

The object also includes following background color modifier functions: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`.

```javascript
console.log(
  nc.bgBlack(
    nc.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)
```

Besides colors, the object includes following formatting functions: `dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse`.

```javascript
for (let task of tasks) {
  console.log(`${nc.bold(task.name)} ${nc.dim(task.durationMs + "ms")}`)
}
```

The library provides additional utilities to ensure the best results for the task:

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import nc from "@nyxb/colors"

  if (nc.isColorSupported) {
    console.log("Yay! This script can use colors and formatters")
  }
  ```

- `createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

  ```javascript
  import nc from "@nyxb/colors"

  let { red, bgWhite } = nc.createColors(options.enableColors)
  ```

## Replacing `chalk`

1. Replace package name in import:

   ```diff
   - import chalk from 'chalk'
   + import nyxc from '@nyxb/colors'
   ```

2. Replace variable:

   ```diff
   - chalk.red(text)
   + nyxc.red(text)
   ```

3. Replace chains to nested calls:

   ```diff
   - chalk.red.bold(text)
   + nyxc.red(nyxc.bold(text))
   ```

4. You can use [`colorize-template`](https://github.com/usmanyunusov/colorize-template)
   to replace chalk’s tagged template literal.

   ```diff
   + import { createColorize } from 'colorize-template'

   + let colorize = createColorize(nyxc)
   - chalk.red.bold`full {yellow ${"text"}}`
   + colorize`{red.bold full {yellow ${"text"}}}`
   ```
