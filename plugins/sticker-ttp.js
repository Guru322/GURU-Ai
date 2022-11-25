
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    if (!text) throw `✳️ send the text\n\n📌Example *${usedPrefix + command}* GURU-BOT`  
    let stiker = await sticker(null, global.API('xteam', '/ttp', { file: '', text: text }), global.packname, global.author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m, null, rpl)
    throw stiker.toString()
}
handler.help = ['ttp <text>']
handler.tags = ['sticker']
handler.command = ['ttp']

export default handler
