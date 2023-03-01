# app-path

> Get the path to an app *(macOS)*

## Install

```
$ npm install app-path
```

## Usage

```js
import appPath from 'app-path';

console.log(await appPath('Safari'));
//=> '/Applications/Safari.app'

console.log(await appPath('com.apple.Safari'));
//=> '/Applications/Safari.app'

console.log(appPath.sync('Safari'));
//=> '/Applications/Safari.app'
```

## API

### appPath(appName)

Returns a `Promise<string>` with the path to the app specified in `appName`. Rejects when run on any other operating system than macOS.

### appPath.sync(appName)

Returns the path to the app specified in `appName`. Throws when run on any other operating system than macOS.

#### appName

Type: `string`

An app name or bundle identifier.

## Related

- [app-path-cli](https://github.com/sindresorhus/app-path-cli) - CLI for this module
