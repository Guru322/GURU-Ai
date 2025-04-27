import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let [packname, ...authorParts] = args.join` `.split`|`
    let author = (authorParts.join`|`) || global.author
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let buffer = /image|video|gif|webp/.test(mime) ? await q.download() : null
    let url = !buffer && args[0] && isUrl(args[0]) ? args[0] : null
    if (!buffer && !url) throw `*RESPOND TO AN IMAGE, VIDEO, GIF, OR PROVIDE A URL WITH ${usedPrefix + command}*`
    let stikerBuffer = await sticker(buffer, url, packname || global.packname, author)
    await conn.sendMessage(m.chat, { sticker: stikerBuffer }, { quoted: m })
  } catch (err) {
    m.reply(err.toString())
  }
}
handler.help = ['sfull']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'sfull']
handler.desc = 'Convert an image, video, or GIF to a sticker. Use with a URL or reply to a media message.'
export default handler
const isUrl = text =>
  text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  )