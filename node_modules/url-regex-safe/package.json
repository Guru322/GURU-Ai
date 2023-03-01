{
  "name": "url-regex-safe",
  "description": "Regular expression matching for URL's. Maintained, safe, and browser-friendly version of url-regex. Resolves CVE-2020-7661. Works in Node v10.12.0+ and browsers.",
  "version": "3.0.0",
  "author": "Nick Baugh <niftylettuce@gmail.com> (http://niftylettuce.com/)",
  "browser": {
    "re2": false
  },
  "bugs": {
    "url": "https://github.com/niftylettuce/url-regex-safe/issues",
    "email": "niftylettuce@gmail.com"
  },
  "contributors": [
    "Nick Baugh <niftylettuce@gmail.com> (http://niftylettuce.com/)",
    "Kevin Mårtensson <kevinmartensson@gmail.com>",
    "Diego Perini"
  ],
  "dependencies": {
    "ip-regex": "4.3.0",
    "tlds": "^1.228.0"
  },
  "peerDependencies": {
    "re2": "^1.17.2"
  },
  "peerDependenciesMeta": {
    "re2": {
      "optional": true
    }
  },
  "devDependencies": {
    "@babel/cli": "^7.16.7",
    "@babel/core": "^7.16.7",
    "@babel/preset-env": "^7.16.7",
    "@commitlint/cli": "latest",
    "@commitlint/config-conventional": "latest",
    "ava": "latest",
    "babelify": "^10.0.0",
    "browserify": "^17.0.0",
    "codecov": "latest",
    "cross-env": "latest",
    "eslint": "latest",
    "eslint-config-xo-lass": "latest",
    "eslint-plugin-compat": "^4.0.0",
    "eslint-plugin-node": "^11.1.0",
    "fixpack": "latest",
    "husky": "latest",
    "jsdom": "15",
    "lint-staged": "latest",
    "nyc": "latest",
    "re2": "latest",
    "remark-cli": "latest",
    "remark-preset-github": "latest",
    "tinyify": "^3.0.0",
    "xo": "latest"
  },
  "engines": {
    "node": ">= 10.12.0"
  },
  "files": [
    "lib",
    "dist"
  ],
  "homepage": "https://github.com/niftylettuce/url-regex-safe",
  "jsdelivr": "dist/url-regex-safe.min.js",
  "keywords": [
    "2020",
    "7661",
    "CVE-2020-7661",
    "cve",
    "detect",
    "email",
    "emails",
    "expresion",
    "expression",
    "from",
    "get",
    "html",
    "mail",
    "mails",
    "maintained",
    "parse",
    "parser",
    "parsing",
    "regex",
    "regexer",
    "regexer",
    "regexes",
    "regexing",
    "regexp",
    "safe",
    "scan",
    "sniff",
    "str",
    "string",
    "text",
    "url",
    "urls"
  ],
  "license": "MIT",
  "main": "lib/index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/niftylettuce/url-regex-safe"
  },
  "scripts": {
    "ava": "cross-env NODE_ENV=test ava",
    "browserify": "browserify src/index.js -o dist/url-regex-safe.js -s urlRegexSafe -g [ babelify --configFile ./.dist.babelrc ]",
    "build": "npm run build:clean && npm run build:lib && npm run build:dist",
    "build:clean": "rimraf lib dist",
    "build:dist": "npm run browserify && npm run minify",
    "build:lib": "babel --config-file ./.lib.babelrc src --out-dir lib",
    "coverage": "nyc report --reporter=text-lcov > coverage.lcov && codecov",
    "lint": "yarn run lint:js && yarn run lint:md && yarn run lint:lib && yarn run lint:dist",
    "lint:dist": "eslint --no-inline-config -c .dist.eslintrc dist",
    "lint:js": "xo",
    "lint:lib": "eslint -c .lib.eslintrc lib",
    "lint:md": "remark . -qfo",
    "minify": "cross-env NODE_ENV=production browserify src/index.js -o dist/url-regex-safe.min.js -s urlRegexSafe -g [ babelify --configFile ./.dist.babelrc ] -p tinyify",
    "nyc": "cross-env NODE_ENV=test nyc ava",
    "pretest": "yarn run build && yarn run lint",
    "test": "cross-env NODE_ENV=test ava",
    "test-coverage": "cross-env NODE_ENV=test nyc yarn run test"
  },
  "unpkg": "dist/url-regex-safe.min.js",
  "xo": {
    "prettier": true,
    "space": true,
    "extends": [
      "xo-lass"
    ]
  }
}
