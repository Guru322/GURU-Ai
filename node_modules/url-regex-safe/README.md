# url-regex-safe

[![build status](https://img.shields.io/travis/com/niftylettuce/url-regex-safe.svg)](https://travis-ci.com/niftylettuce/url-regex-safe)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/url-regex-safe.svg)](https://codecov.io/gh/niftylettuce/url-regex-safe)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/url-regex-safe.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/url-regex-safe.svg)](https://npm.im/url-regex-safe)

> Regular expression matching for URL's. Maintained, safe, and browser-friendly version of [url-regex][]. Resolves [CVE-2020-7661][cve] for Node.js servers. Works in Node v10.12.0+ and browsers.


## Table of Contents

* [Foreword](#foreword)
* [Install](#install)
* [Usage](#usage)
  * [Node](#node)
  * [Browser](#browser)
* [Options](#options)
* [Quick tips and migration from url-regex](#quick-tips-and-migration-from-url-regex)
* [Limitations](#limitations)
* [Contributors](#contributors)
* [License](#license)


## Foreword

After discovering [CVE-2020-7661][cve] and disclosing it [publicly](https://portswigger.net/daily-swig/unpatched-regex-bug-leaves-node-js-apps-open-to-redos-attacks) (through my work on [Spam Scanner][spam-scanner] and [Forward Email][forward-email]) – I used an implementation of [url-regex][] with some extra glue on top to filter out bad URL matches.

However after using it on [Forward Email][forward-email] in production (which processes hundreds of thousands of emails per week), I found and documented several more [core issues](https://github.com/kevva/url-regex/pull/35) with [url-regex][].

Realizing that [url-regex][] is no longer actively maintained, has 9 open pull requests as of this writing, and also lacked browser support – I decided to write this package for everyone and merge all the open pull requests.

This package should hopefully more closely resemble real-world intended usage of a URL regular expression, and also allowing the user to configure it as they wish.  Please check out [Forward Email][forward-email] if this package helped you, and explore our source code on GitHub which shows how we use this package.


## Install

**NOTE:** As of v3.0.0 you must also install `re2` as a peer dependency.

[npm][]:

```sh
npm install url-regex-safe re2
```

[yarn][]:

```sh
yarn add url-regex-safe re2
```


## Usage

### Node

We've resolved [CVE-2020-7661][cve] by including [RE2][] for Node.js usage.  You will not have to manually wrap your URL regular expressions with `new RE2(urlRegex())` anymore through `url-regex-safe` (we do it automatically for you).

```js
const urlRegexSafe = require('url-regex-safe');

const str = 'some long string with url.com in it';
const matches = str.match(urlRegexSafe());

for (const match of matches) {
  console.log('match', match);
}

console.log(urlRegexSafe({ exact: true }).test('github.com'));
```

### Browser

Since [RE2][] is not made for the browser, it will not be used, and therefore [CVE-2020-7661][cve] is still an issue on the client-side. However it is not severe since the most it would do is crash the browser tab (as on the Node.js side it would have crashed the entire process and thrown an out of memory exception).

#### VanillaJS

This is the solution for you if you're just using `<script>` tags everywhere!

```html
<script src="https://unpkg.com/url-regex-safe"></script>
<script type="text/javascript">
  (function() {
    var str = 'some long string with url.com in it';
    var matches = str.match(urlRegexSafe());

    for (var i=0; i<matches.length; i++) {
      console.log('match', matches[i]);
    }

    console.log(urlRegexSafe({ exact: true }).test('github.com'));
  })();
</script>
```

#### Bundler

Assuming you are using [browserify][], [webpack][], [rollup][], or another bundler, you can simply follow [Node](#node) usage above.

#### TypeScript

To use this package with [TypeScript](https://www.typescriptlang.org/), you can install the [`@types/url-regex-safe`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/url-regex-safe) package for type definitions.

```sh
npm install --save-dev @types/url-regex-safe
```


## Options

| Property         | Type    | Default Value                                                | Description                                                                                                                                                                                                                                                                                                                                                    |   |
| ---------------- | ------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| `exact`          | Boolean | `false`                                                      | Only match an exact String. Useful with `regex.test(str)` to check if a String is a URL. We set this to `false` by default in order to match String values such as `github.com` (as opposed to requiring a protocol or `www` subdomain).  We feel this closely more resembles real-world intended usage of this package.                                       |   |
| `strict`         | Boolean | `false`                                                      | Force URL's to start with a valid protocol or `www` if set to `true`. If `true`, then it will allow any TLD as long as it is a minimum of 2 valid characters. If it is `false`, then it will match the TLD against the list of valid TLD's using [tlds](https://github.com/stephenmathieson/node-tlds#readme).                                                 |   |
| `auth`           | Boolean | `false`                                                      | Match against Basic Authentication headers. We set this to `false` by default since [it was deprecated in Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=82250#c7), and otherwise it leaves the user with unwanted URL matches (more closely resembles real-world intended usage of this package by having it set to `false` by default too). |   |
| `localhost`      | Boolean | `true`                                                       | Allows localhost in the URL hostname portion. See the [test/test.js](test/test.js) for more insight into the localhost test and how it will return a value which may be unwanted. A pull request would be considered to resolve the "pic.jp" vs. "pic.jpg" issue.                                                                                              |   |
| `parens`         | Boolean | `false`                                                      | Match against Markdown-style trailing parenthesis. We set this to `false` because it should be up to the user to parse for Markdown URL's.                                                                                                                                                                                                                     |   |
| `apostrophes`    | Boolean | `false`                                                      | Match against apostrophes. We set this to `false` because we don't want the String `background: url('http://example.com/pic.jpg');` to result in `http://example.com/pic.jpg'`.  See this [issue](https://github.com/kevva/url-regex/pull/55) for more information.                                                                                            |   |
| `trailingPeriod` | Boolean | `false`                                                      | Match against trailing periods. We set this to `false` by default since real-world behavior would want `example.com` versus `example.com.` as the match (this is different than [url-regex][] where it matches the trailing period in that package).                                                                                                           |   |
| `ipv4`           | Boolean | `true`                                                       | Match against IPv4 URL's.                                                                                                                                                                                                                                                                                                                                      |   |
| `ipv6`           | Boolean | `true`                                                       | Match against IPv6 URL's.                                                                                                                                                                                                                                                                                                                                      |   |
| `tlds`           | Array   | [tlds](https://github.com/stephenmathieson/node-tlds#readme) | Match against a specific list of tlds, or the default list provided by [tlds](https://github.com/stephenmathieson/node-tlds#readme).                                                                                                                                                                                                                           |   |
| `returnString`   | Boolean | `false`                                                      | Return the RegExp as a String instead of a `RegExp` (useful for custom logic, such as we did with [Spam Scanner][spam-scanner]).                                                                                                                                                                                                                               |   |


## Quick tips and migration from url-regex

You must override the default and set `strict: true` if you do not wish to match `github.com` by itself (though `www.github.com` will work if `strict: false`).

Unlike the deprecated and unmaintained package [url-regex][], we do a few things differently:

* We set `strict` to `false` by default ([url-regex][] had this set to `true`)
* We added an `auth` option, which is set to `false` by default ([url-regex][] matches against Basic Authentication; had this set to `true` - however this is a deprecated behavior in Chromium).
* We added `parens` and `ipv6` options, which are set to `false` and `true` by default ([url-regex][] had `parens` set to `true` and `ipv6` was non-existent or set to `false` rather).
* We added an `apostrophe` option, which is set to `false` by default ([url-regex][] had this set to `true`).
* We added a `trailingPeriod` option, which is set to `false` by default (which means matches won't contain trailing periods, whereas [url-regex][] had this set to `true`).


## Limitations

Since we cannot use regular expression's "negative lookbehinds" functionality (due to [RE2][] limitations), we could not merge the logic from this [pull request](https://github.com/kevva/url-regex/pull/67/commits/6c31d81c35c3bb72c413c6e4af92a37b2689ead2).  This would have allowed us to make it so `example.jpeg` would match only if it was `example.jp`, however if you pass `example.jpeg` right now it will extract `example.jp` from it (since `.jp` is a TLD).  An alternative solution may exist, and we welcome community contributions regarding this issue.


## Contributors

| Name                 | Website                    |
| -------------------- | -------------------------- |
| **Nick Baugh**       | <http://niftylettuce.com/> |
| **Kevin Mårtensson** |                            |
| **Diego Perini**     |                            |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


##

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[cve]: https://nvd.nist.gov/vuln/detail/CVE-2020-7661

[re2]: https://github.com/uhop/node-re2

[browserify]: https://github.com/browserify/browserify

[webpack]: https://github.com/webpack/webpack

[rollup]: https://github.com/rollup/rollup

[url-regex]: https://github.com/kevva/url-regex

[spam-scanner]: https://spamscanner.net

[forward-email]: https://forwardemail.net
