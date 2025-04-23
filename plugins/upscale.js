import fs from 'fs'
import os from 'os'
import path from 'path'
import crypto from 'crypto'
import { upscaleImage } from '../lib/upscale.js'

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime && (!args[0] || !/^https?:\/\//.test(args[0]))) {
    throw `Usage: ${usedPrefix + command} <image|sticker reply> [scale]\nOr: ${usedPrefix + command} <image_url> [scale]`;
  }

  let input;
  let scale = 4; 

  if (mime) {
    let img = await q.download?.();
    if (!img) throw '*Failed to download the image*';
    const ext = mime.split('/')[1] || 'jpg';
    const tmpFile = path.join(os.tmpdir(), crypto.randomUUID() + '.' + ext);
    await fs.promises.writeFile(tmpFile, img);
    input = tmpFile;
  } else if (args[0] && /^https?:\/\//.test(args[0])) {
    input = args[0];
    if (args[1] && !isNaN(args[1])) scale = parseInt(args[1]);
  }

  await m.reply(`⏳ Upscaling image by ${scale}x, please wait...`);
  try {
    const result = await upscaleImage(input, scale);
    console.log('Upscaled image size:', result.length, 'bytes');
    
    await conn.sendMessage(
      m.chat,
      { 
        image: result, 
        caption: `🖼️ *Upscaled Image*`,
        mimetype: 'image/jpeg',
        fileName: `upscaled-${Date.now()}.jpg`
      },
      { quoted: m }
    );
  } catch (err) {
    throw `❎ Upscale failed: ${err.message}`;
  } finally {
    if (input && input.startsWith(os.tmpdir())) {
      fs.promises.unlink(input).catch(() => {});
    }
  }
};

handler.help = ['upscale']
handler.tags = ['tools']
handler.command = ['upscale', 'hdr']
handler.desc = 'Upscale an image or sticker. Reply to an image or provide a URL.'
export default handler
