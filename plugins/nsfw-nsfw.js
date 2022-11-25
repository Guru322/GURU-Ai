import fetch from 'node-fetch'
import axios from 'axios'
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	
	if (!global.db.data.chats[m.chat].nsfw && m.isGroup) throw ` group does not support nsfw content \n\n use this command \n*${usedPrefix}enable* nsfw`
   var {age} = global.db.data.users[m.sender]
   if (age <17) throw m.reply(`❎ You are underage! Come back when you are over 18`) 
   
   m.react(rwait)

let type = (command).toLowerCase()

switch (type) {
	
	//-- nsfw  anime
	case 'xwaifu':
        let xwai = await fetch(`https://api.waifu.pics/nsfw/waifu`)
        if (!xwai.ok) throw await xwai.text()
        let xwfu = await xwai.json()
        if (!xwfu.url) throw '❎ Error'
        conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, xwfu.url, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
       m.react(xmoji)    
  break

case 'xneko':
  let xnek = await fetch(`https://api.waifu.pics/nsfw/neko`)
    if (!xnek.ok) throw await xnek.text()
    let xko = await xnek.json()
    if (!xko.url) throw '❎ Error'
    conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, xko.url, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break
	

case 'blowjob':
  let res = await fetch(`https://api.waifu.pics/nsfw/${command}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw '❎ Error'
    conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, json.url, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break

//--
case 'ass':
case 'culos':
    let xacs = ["https://meme-api.herokuapp.com/gimme/CuteLittleButts", "https://meme-api.herokuapp.com/gimme/ass"]
    let as = await axios.get(pickRandom(xacs))
    conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, as.data.url, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break

case 'boobs':
case 'boobies':
    let xb = ["https://meme-api.herokuapp.com/gimme/tits", "https://meme-api.herokuapp.com/gimme/BestTits", "https://meme-api.herokuapp.com/gimme/boobs", "https://meme-api.herokuapp.com/gimme/amazingtits", "https://meme-api.herokuapp.com/gimme/TinyTits"]
    let boo = await axios.get(pickRandom(xb))
    conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, boo.data.url, [['▷▷ You are underage', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break

case 'pussy':
    let xp = ["https://meme-api.herokuapp.com/gimme/pussy", "https://meme-api.herokuapp.com/gimme/LegalTeens"] 
    let pus = await axios.get(pickRandom(xp))
    conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, pus.data.url, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break

case 'lesbians':
case 'lesbian':
    let les = await axios.get(`https://meme-api.herokuapp.com/gimme/lesbians`)
   conn.sendButton(m.chat, `✅ Random *${command}*`, fgyt, les.data.url, [['▷▷ SHIT', `${usedPrefix + command}`]], m)
   m.react(xmoji) 
break

case 'pack':
case 'cosplay':
	     let img = await conn.getFile(global.API('fgmods', '/api/nsfw/cosplay', {}, 'apikey'))
	     let cosp = img.data
	     conn.sendButton(m.chat, `✅ ResulT 🤭\n Random *${command}*`, 'Send more photos here \nhttps://t.me/i_want_to_be_isekaied \n\n', cosp, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
	     m.react(xmoji) 
	break


default:
 }
}

handler.help = ['xwaifu', 'xneko', 'blowjob', 'ass', 'boobs', 'lesbian', 'pussy', 'pack']
handler.tags = ['nsfw']
handler.command = /^(xwaifu|xneko|blowjob|ass|culos|boobs|boobies|lesbian|lesbians|pussy|cosplay|pack)$/i
handler.diamond = true
handler.register = true

export default handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
