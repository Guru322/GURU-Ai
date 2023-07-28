
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) throw `✳️ Please enter a number representing the number of days!\n\n📌 Example :\n*${usedPrefix + command}* 30`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var nDays = 86400000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nDays
    else global.db.data.chats[who].expired = now + nDays
    let teks = `✅ The expiration days were established for \n*${await conn.getName(who)}* \n\n*Duration:* ${args[0]} Days\n\n*Countdown :* ${msToDate(global.db.data.chats[who].expired - now)}`
    m.reply(teks)
    //conn.sendButton(m.chat, teks, igfg, null, [['Del Expired', `${usedPrefix}delexpired`], ['Check Expired', `${usedPrefix}checkexpired`]], m)
}
handler.help = ['expired <días>']
handler.tags = ['owner']
handler.command = /^(expired|addexpired)$/i
handler.rowner = true
export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days*\n ', h, ' *Hours*\n ', m, ' *Minutes*\n ', s, ' *Seconds* '].map(v => v.toString().padStart(2, 0)).join('')
}
