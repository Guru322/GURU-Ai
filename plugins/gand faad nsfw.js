// created by Guru , provided for free , valentine gift for single londo
import fetch from 'node-fetch'
import axios from "axios"
let handler = async (m, { conn, usedPrefix, command }) => {
	
	if (!global.db.data.chats[m.chat].nsfw) throw `🚫 group doesnt supprt nsfw \n\n enable it by \n*${usedPrefix}enable* nsfw`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ uneed to be atleast 18 years`) 
   
let type = (command).toLowerCase()
let apikey = global.keysxxx
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName[who]
let fgif = m

    
if (command == 'schoolswimsuit') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/schoolswimsuit`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}
  
if (command == 'spreadpussy') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/spreadpussy`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'swimsuit') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/swimsuit`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'genshin') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/genshin`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'underwear') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/underwear`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'nipple') {
let haha = await conn.getFile(`https://fantox-apis.vercel.app/nipples`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

}
handler.command = ['schoolswimsuit', 'swimsuit', 'nipple', 'genshin', 'spreadpussy']
handler.diamond = true
handler.register = true
handler.group = true

export default handler

