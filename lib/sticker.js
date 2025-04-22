import fetch from 'node-fetch'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

/**
 * Create a WhatsApp sticker using wa-sticker-formatter
 * @param {Buffer} img - Image/Video Buffer
 * @param {String} url - Media URL
 * @param {String} packname - Sticker Pack name
 * @param {String} author - Sticker Author
 */
async function sticker(img, url, packname = global.packname || '', author = global.author || '') {
  let media = img
  if (!media && url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(await res.text())
    media = await res.buffer()
  }
  const stickerPkg = new Sticker(media, {
    pack: packname,
    author: author,
    type: StickerTypes.DEFAULT,
    quality: 80,
  })
  return await stickerPkg.toBuffer()
}

export { sticker }
