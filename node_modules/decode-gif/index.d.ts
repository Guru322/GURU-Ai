declare namespace decodeGif {
	/** A gif frame. */
	export interface FrameType {
		/** The time code in milliseconds that the frame appears at. */
		timeCode: number

		/** The frame data. */
		data: Uint8ClampedArray
	}

	export interface ResultType {
		/** The width of the gif. */
		width: number

		/** The height of the gif. */
		height: number

		/** Each frame of the gif. */
		frames: FrameType[]
	}
}

/**
Decode the frames of a gif.
@param data The gif data. Can be anything array-like such as a `Buffer`, `Array` or `Uint8Array`.
@example
```
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
*\/
```
*/
declare function decodeGif(data: ArrayLike<number>): decodeGif.ResultType

export = decodeGif
