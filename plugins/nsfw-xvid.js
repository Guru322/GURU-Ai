
import axios from 'axios'
//import db from '../lib/database.js'

let handler = async(m, { conn, usedPrefix, command }) => {
	
	if (!global.db.data.chats[m.chat].nsfw && m.isGroup) throw `❗This group doesn't support nsfw \n\n enable it \n*${usedPrefix}enable* nsfw`
	let vid = (await axios.get(`https://raw.githubusercontent.com/FG98F/team-fg/main/nsfw/xvid.json`)).data
    conn.sendMessage(m.chat, { document: { url: pickRandom(vid)}, mimetype: 'video/mp4', fileName: 'xvid random.mp4'}, {quoted: m})
    m.react(xmoji)
}

handler.help = ['xvid']
handler.tags = ['nsfw', 'prem']
handler.command = ['xvid', 'xvideos', 'xvideo']
handler.premium = true
handler.diamond = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
