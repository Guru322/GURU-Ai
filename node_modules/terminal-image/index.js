import fs, {promises as fsPromises} from 'node:fs';
import chalk from 'chalk';
import Jimp from 'jimp';
import termImg from 'term-img';
import renderGif from 'render-gif';
import logUpdate from 'log-update';

// `log-update` adds an extra newline so the generated frames need to be 2 pixels shorter.
const ROW_OFFSET = 2;

const PIXEL = '\u2584';

function scale(width, height, originalWidth, originalHeight) {
	const originalRatio = originalWidth / originalHeight;
	const factor = (width / height > originalRatio ? height / originalHeight : width / originalWidth);
	width = factor * originalWidth;
	height = factor * originalHeight;
	return {width, height};
}

function checkAndGetDimensionValue(value, percentageBase) {
	if (typeof value === 'string' && value.endsWith('%')) {
		const percentageValue = Number.parseFloat(value);
		if (!Number.isNaN(percentageValue) && percentageValue > 0 && percentageValue <= 100) {
			return Math.floor(percentageValue / 100 * percentageBase);
		}
	}

	if (typeof value === 'number') {
		return value;
	}

	throw new Error(`${value} is not a valid dimension value`);
}

function calculateWidthHeight(imageWidth, imageHeight, inputWidth, inputHeight, preserveAspectRatio) {
	const terminalColumns = process.stdout.columns || 80;
	const terminalRows = process.stdout.rows - ROW_OFFSET || 24;

	let width;
	let height;

	if (inputHeight && inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, terminalColumns);
		height = checkAndGetDimensionValue(inputHeight, terminalRows) * 2;

		if (preserveAspectRatio) {
			({width, height} = scale(width, height, imageWidth, imageHeight));
		}
	} else if (inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, terminalColumns);
		height = imageHeight * width / imageWidth;
	} else if (inputHeight) {
		height = checkAndGetDimensionValue(inputHeight, terminalRows) * 2;
		width = imageWidth * height / imageHeight;
	} else {
		({width, height} = scale(terminalColumns, terminalRows * 2, imageWidth, imageHeight));
	}

	if (width > terminalColumns) {
		({width, height} = scale(terminalColumns, terminalRows * 2, width, height));
	}

	width = Math.round(width);
	height = Math.round(height);

	return {width, height};
}

async function render(buffer, {width: inputWidth, height: inputHeight, preserveAspectRatio}) {
	const image = await Jimp.read(buffer);
	const {bitmap} = image;

	const {width, height} = calculateWidthHeight(bitmap.width, bitmap.height, inputWidth, inputHeight, preserveAspectRatio);

	image.resize(width, height);

	let result = '';
	for (let y = 0; y < image.bitmap.height - 1; y += 2) {
		for (let x = 0; x < image.bitmap.width; x++) {
			const {r, g, b, a} = Jimp.intToRGBA(image.getPixelColor(x, y));
			const {r: r2, g: g2, b: b2} = Jimp.intToRGBA(image.getPixelColor(x, y + 1));
			result += a === 0 ? chalk.reset(' ') : chalk.bgRgb(r, g, b).rgb(r2, g2, b2)(PIXEL);
		}

		result += '\n';
	}

	return result;
}

const terminalImage = {};

terminalImage.buffer = async (buffer, {width = '100%', height = '100%', preserveAspectRatio = true} = {}) => {
	return termImg(buffer, {
		width,
		height,
		fallback: () => render(buffer, {height, width, preserveAspectRatio})
	});
};

terminalImage.file = async (filePath, options = {}) =>
	terminalImage.buffer(await fsPromises.readFile(filePath), options);

terminalImage.gifBuffer = (buffer, options = {}) => {
	options = {
		renderFrame: logUpdate,
		maximumFrameRate: 30,
		...options
	};

	const finalize = () => {
		if (options.renderFrame.done) {
			options.renderFrame.done();
		}
	};

	const result = termImg(buffer, {
		width: options.width,
		height: options.height,
		fallback: () => false
	});

	if (result) {
		options.renderFrame(result);
		return finalize;
	}

	const animation = renderGif(buffer, async frameData => {
		options.renderFrame(await terminalImage.buffer(Buffer.from(frameData), options));
	}, options);

	return () => {
		animation.isPlaying = false;
		finalize();
	};
};

terminalImage.gifFile = (filePath, options = {}) =>
	terminalImage.gifBuffer(fs.readFileSync(filePath), options);

export default terminalImage;
