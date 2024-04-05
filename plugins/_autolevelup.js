//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
*▢ 𝙇𝙀𝙑𝙀𝙇 𝙐𝙋*

 *${before}* ‣  *${user.level}*
 ROLE : *${user.role}*
 
 _𝙏𝙤 𝘿𝙀𝘼𝘾𝙏𝙄𝙑𝘼𝙏𝙀 𝙒𝙍𝙄𝙏𝙀_
_*/off autolevelup*_
	`.trim())
    }
}

