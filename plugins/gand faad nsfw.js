// created by Guru , provided for free , valentine gift for single londo
import fetch from 'node-fetch'
import axios from "axios"
let handler = async (m, { conn, usedPrefix, command }) => {
	
	if (!global.db.data.chats[m.chat].nsfw) throw `🚫 group doesnt supprt nsfw \n\n enable it by \n*${usedPrefix}enable* nsfw`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ uneed to be atleast 18 years`) 
   
    m.react(rwait)
    let type = (command).toLowerCase()
    
    switch (type) {

    
case 'sswimsuit':
 let img = await conn.getFile(`https://fantox-apis.vercel.app/schoolswimsuit`)
	     conn.sendButton(m.chat, `✅ Result 🤭\n Random *${command}*`, fgyt, img.data, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
         m.react(xmoji) 
         break

 case 'underwear':
let im = await conn.getFile(`https://fantox-apis.vercel.app/underwear`)
conn.sendButton(m.chat, `✅ Result 🤭\n Random *${command}*`, fgyt, im.data, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
 m.react(xmoji) 
break

case 'swimsuit':
 let imgi = await conn.getFile(`https://fantox-apis.vercel.app/swimsuit`)
	     conn.sendButton(m.chat, `✅ Result 🤭\n Random *${command}*`, fgyt, imgi.data, [['▷▷ NEXT', `${usedPrefix + command}`]], m)
         m.react(xmoji) 
         break
case 'nipple':
let mg = await conn.getFile(`https://fantox-apis.vercel.app/nipple`)
        conn.sendButton(m.chat, `✅ Result 🤭\n Random *${command}*`, fgyt
