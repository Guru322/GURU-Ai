
import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = `
≡ _Use the commands with the prefix . _

▢ If you have more audio   
send me by t.me/i_want_to_be_isekaied *audio + command* with which you will respond

Bot has more than 100 commands and i am lazy to write all
`
//const pp = await (await fetch('https://i.ibb.co/qMG1JPY/fg.jpg')).buffer()
    let pp = './src/fg_logo.jpg' 
    conn.sendButton(m.chat, m2, '▢ ᴳᵁᴿᵁ  ┃ ᴮᴼᵀ\n▢ Follow on Instagram\nhttps://www.instagram.com/asli_guru69\n', pp, [
      ['⏍ Info', `${usedPrefix}botinfo`],
      ['⌬ Groups', `${usedPrefix}gpdylux`]
    ],m, rpyt)
   
}

handler.help = ['audios']
handler.tags = ['main']
handler.command = ['menu', 'help'] 

export default handler
