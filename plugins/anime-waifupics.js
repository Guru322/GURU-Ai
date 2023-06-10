import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
m.react(rwait)

let type = (command).toLowerCase()

switch (type) {
	
	case 'loli':
	     let img = await conn.getFile(global.API('fgmods', '/api/loli', {}, 'apikey'))
	     let loli = img.data 
	      conn.sendFile(m.chat, loli.data, 'img.jpg', `✅ Random ${command}`, m)
	     m.react(dmoji) 
	break
	
case 'waifu':
case 'megumin':
case 'neko':
  let res = await fetch(`https://api.waifu.pics/sfw/${command}`)
    if (!res.ok) throw await res.text()
    let json = await res.json(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/waifu.json`)
    if (!json.url) throw '❎ Error'
    conn.sendFile(m.chat, json.url, 'img.jpg', `✅ Random ${command}`, m)
   m.react(dmoji) 
break


default:
 }
}

handler.help = ['waifu', 'neko', 'megumin', 'loli']
handler.tags = ['nime']
handler.command = ['waifu', 'neko', 'megumin', 'loli'] 


export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
