
import fg from 'api-dylux' 
let handler = async (m, { conn, args, usedPrefix, command }) => {
 
if (!args[0]) throw `✳️ Send the link of a Facebook video\n\n📌 Example :\n*${usedPrefix + command}* https://fb.watch/d7nB8-L-gR/`
    m.react(rwait)
   try {
   let res = await fg.fbdl(args[0])
    for (let result of res.download) {
    	  let tex = `
┌─⊷ *FBDL*
▢ *Qwality:* ${result.quality}
└───────────`
    conn.sendFile(m.chat, result.url, 'fb.mp4', tex, m)
     } 
     m.react(done)
 } catch {
 	m.reply('Error: Try again with another link')
 	} 
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = ${premium}

export default handler
