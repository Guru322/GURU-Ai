import { exec } from 'child_process'
import speed from 'performance-now'

let handler = async (m, { conn }) => {
  let thumbnail = 'https://www.guruapi.tech/K.jpg'
  let fgg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `GURU-BOT`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'GURU-BOT'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  let pingMsg = await conn.sendMessage(m.chat, {text: 'Pinging...'}, {quoted: fgg})

  let timestamp = speed()

  await exec('neofetch --stdout', async (error, stdout) => {

    let latency = (speed() - timestamp).toFixed(4)

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: `
          *⸙• 「「⸙」‎🌸🖥️*                 
             
        *ʟᴀᴛᴇɴᴄʏ: ${latency} _ᴍs_*
                 🔐⚠️  
    *🫀🄼 ⏜✩ ˻𝐈ʈͥ᥊ ϻaͣŋͫŋ̑ο̑˼ 𓃮•:)*` 
        }
      }
    }, {})

  })

}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed'] 

export default handler
