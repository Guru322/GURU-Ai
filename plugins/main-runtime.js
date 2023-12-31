import displayLoadingScreen from '../lib/loading.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let pp = 'https://i.pinimg.com/736x/eb/a7/25/eba725b9c8df5d9b199e950694f18aaf.jpg'
await displayLoadingScreen(conn, m.chat)
	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let str = `あR U N T I M Eあ \n\n${muptime}`
    conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
      
      mentionedJid: [m.sender],
      isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: global.author,
                serverMessageId: -1
            },
      forwardingScore: 999,
      externalAdReply: {
      title: "ᴛʜᴇ ɢᴜʀᴜ-ʙᴏᴛ",
      body: "R U N T I M E",
      thumbnailUrl: pp,
      sourceUrl: 'https://guruapi.tech',
      mediaType: 1,
      renderLargerThumbnail: false
      }}})
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
