"use strict"

const { GifReader } = require("omggif")
const arrayRange = require("array-range")

module.exports = data => {
	const reader = new GifReader(data)

	let currentTimeCode = 0
	const frames = arrayRange(0, reader.numFrames()).map(frameIndex => {
		const { delay } = reader.frameInfo(frameIndex)

		const frameData = new Uint8ClampedArray(reader.width * reader.height * 4)
		reader.decodeAndBlitFrameRGBA(frameIndex, frameData)

		const data = {
			timeCode: currentTimeCode,
			data: frameData
		}

		currentTimeCode += delay * 10

		return data
	})

	return {
		width: reader.width,
		height: reader.height,
		frames
	}
}
