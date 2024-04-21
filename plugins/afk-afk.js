//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`
 ______ 😴 *AFK*_______
:du bist afk:
________________________ 
${conn.getName(m.sender)} 
________________________
▢ *Grund:* ${text ? text : ''}
  `)
}
handler.help = ['afk <text>']
handler.tags = ['fun']
handler.command = ['pff']
handler.group = true
handler.register = true

export default handler
