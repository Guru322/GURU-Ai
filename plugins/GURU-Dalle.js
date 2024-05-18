import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*This command generates images from text prompts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`

  try {
    m.reply('*Please wait, generating images...*')

    const endpoint = `https://api.gurusensei.workers.dev/dream?prompt=${encodeURIComponent(text)}`
    const response = await fetch(endpoint)

    if (response.ok) {
      const imageBuffer = await response.buffer()
      let imgurl = await uploadImage(imageBuffer)
      await conn.sendButton(m.chat,'Here is your Result', author, imgurl, [['Script', `.sc`]], null, [['Follow Me', `https://github.com/Guru322`]], m)
    } else {
      throw '*Image generation failed*'
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*'
  }
}

handler.help = ['dalle']
handler.tags = ['AI']
handler.command = ['dalle', 'gen', 'imagine', 'openai2']
export default handler



