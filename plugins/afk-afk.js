//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`
  🥡⛓️ *Sealed* 
You are now sealed until u send a message 
▢ *User:* ${conn.getName(m.sender)} 
▢ *Reason:* ${text ? text : ''}
  `)
}
handler.help = ['afk <reason>']
handler.tags = ['fun']
handler.command = ['seal']
handler.group = true

export default handler
