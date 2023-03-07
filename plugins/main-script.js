import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = ` ASK OWNER 
`
let pp = 'AsliGuru' 
conn.sendButton(m.chat, m2, pp, [
  ['⏍ Info', `${usedPrefix}botinfo`],
  ['⌬ OWNER', `${usedPrefix}gpguru`]
],m, rpyt)
   
}

handler.help = ['audios']
handler.tags = ['main']
handler.command = ['script', 'sc', 'repo'] 

export default handler

