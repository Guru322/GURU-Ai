
let handler = async(m, { conn, usedPrefix, command }) => {
	
	let img = await conn.getFile(global.API('fgmods', '/api/asupan-la', { }, 'apikey'))
    let asupan = img.data
    conn.sendButton(m.chat, `✅ Result`, igfg, asupan, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
    m.react(dmoji)
    
}
handler.help = ['tvid']
handler.tags = ['img']
handler.command = ['asupan', 'tvid']
handler.premium = false
handler.diamond = true

export default handler
