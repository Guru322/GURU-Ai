import fetch from "node-fetch"

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://fb.watch/tXadtHWTjf/?mibextid=lbJOhI7Z2ZfpRMIi`
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

  let url = `https://api.guruapi.tech/fbvideo?url=${args[0]}`

  m.react(rwait)

  try {
    const result = await fetch(url)
    const tex = `
⊱ ─── {* GURU FBDL*} ─── ⊰
↳ *VIDEO TITLE:* ${result.result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`

    const response = await fetch(result.result.hd)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = true

export default handler
