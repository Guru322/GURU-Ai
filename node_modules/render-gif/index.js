"use strict"

const Jimp = require("jimp")
const Cycled = require("cycled")
const delay = require("delay")
const decodeGif = require("decode-gif")

module.exports = (data, callback, { maximumFrameRate = Infinity } = {}) => {
	if (typeof maximumFrameRate !== "number") {
		throw new TypeError(`Expected \`maximumFrameRate\` to be a number, got ${typeof maximumFrameRate}`)
	}

	const { width, height, frames: gifFrames } = decodeGif(data)

	let image

	const renderGifFrame = async ({ data, width, height }) => {
		if (!image) {
			image = await Jimp.create(width, height)
		}

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const dataIndex = (y * width * 4) + (x * 4)
				if (!(data[dataIndex] === 0 && data[dataIndex + 1] === 0 && data[dataIndex + 2] === 0 && data[dataIndex + 3] === 0)) {
					image.setPixelColour(Jimp.rgbaToInt(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3]), x, y)
				}
			}
		}

		return new Uint8ClampedArray(await image.getBufferAsync(Jimp.MIME_PNG))
	}

	const frames = new Cycled(gifFrames)
	let isPlaying_ = true

	const shouldReturnFrame = () => {
		if (maximumFrameRate === Infinity) {
			return true
		}

		const { timeCode } = frames.current()
		const { timeCode: nextTimeCode } = frames.peek(1)

		return timeCode % (1000 / maximumFrameRate) <= nextTimeCode - timeCode
	}

	const renderFrame = async () => {
		const renderedFrame = await renderGifFrame({ data: frames.current().data, width, height })

		if (shouldReturnFrame()) {
			callback(renderedFrame)
		}

		await delay(frames.peek(1).timeCode - frames.current().timeCode)
		frames.next()

		if (isPlaying_) {
			await renderFrame()
		}
	}

	renderFrame()

	return {
		get isPlaying() {
			return isPlaying_
		},
		set isPlaying(value) {
			if (typeof value !== "boolean") {
				throw new TypeError(`Expected a boolean, got ${typeof value}`)
			}

			if (!isPlaying_ && value) {
				renderFrame()
			}

			isPlaying_ = value
		}
	}
}
