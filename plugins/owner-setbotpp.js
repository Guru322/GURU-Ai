import fs from 'fs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jimp_1 = require('jimp')

let handler = async (m, { conn, command, usedPrefix }) => {
 let q = m.quoted ? m.quoted : m
 let mime = (q.msg ? q.msg : q).mimetype ? q.mimetype : q.mediaType || ''
 if (/image/g.test(mime) && !/webp/g.test(mime)) {
  try {
   let media = await q.download()
   let botNumber = await conn.user.jid
   let { img } = await pepe(media)
   await conn.query({
    tag: 'iq',
    attrs: {
     to: botNumber,
     type:'set',
     xmlns: 'w:profile:picture'
    },
    content: [
     {
      tag: 'picture',
      attrs: { type: 'image' },
      content: img
     }
    ]
   })
   m.reply('Successfully changed Bot PP')
  } catch (e) {
   console.log(e)
   m.reply('An error occurred, try again later.')
  }
 } else {
  m.reply(`Send image with caption ${usedPrefix + command} or tag image that has been sent`)
 }
}

handler.help = ['setppbotfull']
handler.tags = ['owner']
handler.command = /^(setbotpp)$/i

handler.owner = true

export default handler

async function pepe(media) {
    const jimp = require('jimp');
    const image = await jimp.read(media)
    const min = image.getWidth()
    const max = image.getHeight()
    const cropped = image.crop(0, 0, min, max)
    return {
     img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
     preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
    }
   }
   
