import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let img = (await axios.get(`https://raw.githubusercontent.com/FG98F/team-fg/main/img/hu.json`)).data
    let stiker = await sticker(null, global.API(`${pickRandom(img)}`), global.packname, global.author)
    if (stiker) return await conn.sendFile(m.chat, stiker, 'sticker.webp', { asSticker: true }, m)
    throw stiker.toString()   
}

handler.customPrefix = /^(khajs)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
