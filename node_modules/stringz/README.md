# Stringz [![Build Status](https://travis-ci.org/sallar/stringz.svg?branch=master)](https://travis-ci.org/sallar/stringz) [![codecov](https://codecov.io/gh/sallar/stringz/branch/master/graph/badge.svg)](https://codecov.io/gh/sallar/stringz) [![npm](https://img.shields.io/npm/dm/stringz.svg)](https://www.npmjs.com/package/stringz)

A really small, performant, unicode-aware library for working
with Strings in Node.js.

Javascript has a serious problem with unicode. Even ES6 can’t solve the problem
entirely since some characters like the new colored emojis are three bytes
instead of two bytes. Sometimes even more! `"👍🏽".length` returns `4` which is
totally wrong (hint: it should be 1!). ES6's `Array.from` tried to solve this,
but that even fails: `Array.from("👍🏽")` returns `["👍", "🏽"]` which is
incorrect. This library tries to tackle all these problems with a mega RegExp.
[Read More Here](https://mathiasbynens.be/notes/javascript-unicode).

## Features

* Unicode-aware string manipulation tools
* High performance

## Install

```bash
$ npm install stringz --save
```

And import it in your awesome node app:

```javascript
// ES2015+
import * as stringz from 'stringz'; // OR:
import { limit, substring, length, substr } from 'stringz';
```

```javascript
// CommonJS
const stringz = require('stringz'); // OR:
const { limit, substr } = require('stringz');
```

## Usage

* [`limit()`](#limit-string-to-width)
* [`length()`](#string-length)
* [`substring()`](#substring)
* [`substr()`](#substr)
* [`indexOf()`](#indexof)
* [`toArray()`](#toarray)

### Limit String to Width

    function limit(str[, limit[, padStr[, padPosition]]])

| Param       | Type                | Default              | Description                                               |
| ----------- | ------------------- | -------------------- | --------------------------------------------------------- |
| str         | <code>String</code> | _none_               | The string to be limited                                  |
| limit       | <code>Number</code> | <code>16</code>      | Desired string length                                     |
| padStr      | <code>String</code> | <code>"#"</code>     | Character to pad the output with                          |
| padPosition | <code>String</code> | <code>"right"</code> | Pad position: <code>"right"</code> or <code>"left"</code> |

#### Examples

```javascript
// Truncate:
limit('Life’s like a box of chocolates.', 20); // "Life's like a box of"

// Pad:
limit('Everybody loves emojis!', 26, '💩'); // "Everybody loves emojis!💩💩💩"
limit('What are you looking at?', 30, '+', 'left'); // "++++++What are you looking at?"

// Unicode Aware:
limit('🤔🤔🤔', 2); // "🤔🤔"
limit('👍🏽👍🏽', 4, '👍🏽'); // "👍🏽👍🏽👍🏽👍🏽"
```

### String Length

    function length(str)

| Param | Type                | Default | Description                     |
| ----- | ------------------- | ------- | ------------------------------- |
| str   | <code>String</code> | _none_  | String to return the length for |

#### Examples

```javascript
length('Iñtërnâtiônàlizætiøn☃💩'); // 22
```

### Substring

    function substring(str, start[, end])

| Param | Type                | Default       | Description          |
| ----- | ------------------- | ------------- | -------------------- |
| str   | <code>String</code> | _none_        | String to be devided |
| start | <code>Number</code> | _none_        | Start position       |
| end   | <code>Number</code> | End of string | End position         |

#### Examples

```javascript
substring('Emojis 👍🏽 are 🍆 poison. 🌮s are bad.', 7, 14); // "👍🏽 are 🍆"
```

### Substr

    function substr(str[, start[, length]])

| Param  | Type                | Default                               | Description          |
| ------ | ------------------- | ------------------------------------- | -------------------- |
| str    | <code>String</code> | _none_                                | String to be devided |
| start  | <code>Number</code> | Start of string                       | Start position       |
| length | <code>Number</code> | String length minus `start` parameter | Length of result     |

#### Examples

```javascript
substr('A.C. Milan 🇮🇹⚽️', 5, 7); // "Milan 🇮🇹"
```

### IndexOf

    function indexOf(str[, searchStr[, position]])

| Param     | Type                | Default | Description           |
| --------- | ------------------- | ------- | --------------------- |
| str       | <code>String</code> | _none_  | String to get index   |
| searchStr | <code>String</code> | _none_  | String to be searched |
| position  | <code>Number</code> | 0       | Start of searching    |

#### Examples

```javascript
indexOf('Emojis 👍🏽 are 🍆 poison. 🌮s are bad.', 'are'); // 9
indexOf('Emojis 👍🏽 are 🍆 poison. 🌮s are bad.', 'are', 10); // 26
```

### ToArray

    function toArray(str)

| Param | Type                | Default | Description                |
| ----- | ------------------- | ------- | -------------------------- |
| str   | <code>String</code> | _none_  | String to convert to array |

#### Examples

```javascript
toArray('👍🏽🍆🌮'); // ['👍🏽', '🍆', '🌮']
```

## Test

```bash
$ npm test
```

## Benchmark

This library scores high in a length benchmark (it's intended usage) and should
be fast for most use case.

```
Stringz .length (accurate) x 861,039 ops/sec ±1.57% (84 runs sampled)
Lodash .toArray (accurate) x 795,108 ops/sec ±2.13% (82 runs sampled)
Emoji Aware .split (inaccurate) x 2,269 ops/sec ±1.38% (85 runs sampled)
Spliddit .length (inaccurate) x 487,718 ops/sec ±2.21% (83 runs sampled)
UTF8 Length (inaccurate) x 232,918 ops/sec ±1.02% (87 runs sampled)
Fastest is Stringz .length
```

To run benchmarks yourself:

```bash
$ cd ./benchmark
$ npm install
$ node run.js
```

## Changelog

[Moved to CHANGELOG.md](CHANGELOG.md)

## License

This software is released under the
[MIT License](http://sallar.mit-license.org/).
