# decode-gif [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/decode-gif/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/decode-gif)

Decode the frames of a gif.

[![NPM Badge](https://nodei.co/npm/decode-gif.png)](https://npmjs.com/package/decode-gif)

## Install

```sh
npm install decode-gif
```

## Usage

```js
const fs = require("fs");
const decodeGif = require("decode-gif");

decodeGif(fs.readFileSync("unicorn.gif"));
/*
{
  width: 220,
  height: 165,
  frames: [
    { timeCode: 0, data: [Uint8ClampedArray] },
	{ timeCode: 10, data: [Uint8ClampedArray] },
	...
  ]
}
*/
```

## API

### decodeGif(data)

#### data

Type: `array-like`

The gif data. Can be anything array-like such as a `Buffer`, `Array` or `Uint8Array`.

#### Return value

##### width

Type: `number`

The width of the gif.

##### height

Type: `number`

The height of the gif.

##### frames

An array of each frame of the gif.

##### frame.timeCode

The time code in milliseconds that the frame appears at.

##### frame.data

The frame data as a `Uint8ClampedArray`.
