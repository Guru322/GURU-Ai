// created by Guru , provided for free , valentine gift for single londo

import axios from "axios"
let handler = async (m, { conn, usedPrefix, command }) => {
	
	if (!global.db.data.chats[m.chat].nsfw) throw `🚫 group doesnt supprt nsfw \n\n enable it by \n*${usedPrefix}enable* nsfw`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ uneed to be atleast 18 years`) 
   
m.react(rwait)
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
export default handler

async function wallpaper(title, page = '1') {
return new Promise((resolve, reject) => {
axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`).then(({ data }) => {
let $ = cheerio.load(data)
let hasil = []
$('div.grid-item').each(function (a, b) {
hasil.push({
title: $(b).find('div.info > a > h3').text(),
type: $(b).find('div.info > a:nth-child(2)').text(),
source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
})})
resolve(hasil)})})}
