import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
  let id = m.chat
  if (id in conn.tebakbendera) {
    conn.reply(
      m.chat,
      'There are still unanswered questions in this chat',
      conn.tebakbendera[id][0]
    )
    throw false
  }
  let src = await (
    await fetch(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json'
    )
  ).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
Timeout *${(timeout / 1000).toFixed(2)} second*
use ${usedPrefix}fhint for hint
Reward: ${poin} XP
    `.trim()
  conn.tebakbendera[id] = [
    await conn.sendFile(m.chat, json.img, '', caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.tebakbendera[id])
        conn.reply(m.chat, `Time's up!\nThe answer is *${json.name}*`, conn.tebakbendera[id][0])
      delete conn.tebakbendera[id]
    }, timeout),
  ]
}
handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^guessflag/i

export default handler
