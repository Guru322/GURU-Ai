import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link.`

  m.react(rwait)

  try {
    let q = '128kbps'
    let v = args[0]
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
    const dl_url = await yt.audio[q].download()
    const title = await yt.title

    conn.sendFile(m.chat, dl_url, title + '.mp3', null, m, false, { mimetype: 'audio/mpeg' })

    m.react(xmoji)
  } catch {
    await m.reply(`❎ Error: Could not download the audio.`)
  }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta']

export default handler
