import fs from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import path from 'path';

const __dirname = path.resolve();

const sleep = promisify(setTimeout);

const GIFBufferToVideoBuffer = async (image) => {
  try {
    const filename = `${Math.random().toString(36)}`;
    const gifFilePath = path.join(__dirname, 'tmp', `${filename}.gif`);
    const mp4FilePath = path.join(__dirname, 'tmp', `${filename}.mp4`);

    await fs.writeFile(gifFilePath, image);

    await promisify(exec)(
      `ffmpeg -i ${gifFilePath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${mp4FilePath}`
    );

    await sleep(4000);

    const videoBuffer = await fs.readFile(mp4FilePath);

    await Promise.all([fs.unlink(gifFilePath), fs.unlink(mp4FilePath)]);

    return videoBuffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error processing GIF to video.');
  }
};

export default GIFBufferToVideoBuffer;
