//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
   let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
	let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/Whatsapp.mp4')
	let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
*▢ LEVEL UP*

• ${username} ${registered ? '\n   • ' + name + ' ': ''}

   • @${who.replace(/@.+/, '')}
 *${before}* ‣  *${user.level}*
 ROLE : *${user.role}*
 

	`.trim())
    }
}

