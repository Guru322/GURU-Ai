import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = `
ᴛʜᴇ ɢᴜʀᴜ ʙᴏᴛ ꜱᴄʀɪᴘᴛ

https://github.com/Guru322/GURU-BOT

ᴅᴏ ꜱᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ ᴀɴᴅ ꜰᴏʀᴋ
`
    let pp = './Guru.jpg' 
    conn.sendButton(m.chat, m2, '▢ ᴳᵁᴿᵁ  ┃ ᴮᴼᵀ\n▢ Follow on Instagram\nhttps://www.instagram.com/asli_guru69\n', pp,m, rpyt)
   
}

handler.help = ['audios']
handler.tags = ['main']
handler.command = ['script', 'sc', 'repo'] 

export default handler
