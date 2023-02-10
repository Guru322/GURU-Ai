import axios from "axios"
let handler = async (m, {command, conn}) => {
let apikey = global.keysxxx
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName[who]
let fgif = m

if (command == 'mountain') {
let anu = await wallpaper('mountain')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0] 
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'pubg') {
let pug = ['pubg', 'playerunknowns battlegrounds', 'pubg mobile']  
let pug2 = pug[Math.floor(Math.random() * pug.length)] 
let anu = await wallpaper(pug2)
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0] 
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wpgaming') {
let ga = ['gaming', 'gamers', 'video game']  
let ga2 = ga[Math.floor(Math.random() * ga.length)] 
let anu = await wallpaper(ga2)
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0] 
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wpaesthetic') {
let anu = await wallpaper('aesthetic')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0] 
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wprandom') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/wprandom.json`)).data  
let res2 = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, res2, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'coffee') {
let haha = await conn.getFile(`https://coffee.alexflipnote.dev/random`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'pentol') {
let anu = await wallpaper('milk y mocha')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'cartoon') {
let anu = await wallpaper('cartoon network')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]  
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'space') {
let anu = await wallpaper('cyberspace')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]    
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'technology') {
let anu = await wallpaper('technology')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]      
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'doraemon') {
let anu = await wallpaper('doraemon')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]        
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'hacker') {
let anu = await wallpaper('hacker')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]   
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'planet') { 
let anu = await wallpaper('planet')
let result = anu[Math.floor(Math.random() * anu.length)]  
let haha = result.image[0]     
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'randomprofile') {
let haha = await conn.getFile(`https://zenzapis.xyz/randomimage/profil?apikey=${apikey}`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wpaesthetic2') {
let haha = await conn.getFile(`https://zenzapis.xyz/randomimage/aesthetic?apikey=${apikey}`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wpvehicle') {
let haha = await conn.getFile(`https://zenzapis.xyz/randomimage/mobil?apikey=${apikey}`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wallhp') {
let haha = await conn.getFile(`https://zenzapis.xyz/randomimage/wallhp?apikey=${apikey}`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

if (command == 'wpmoto') {
let haha = await conn.getFile(`https://zenzapis.xyz/randomimage/motor?apikey=${apikey}`)
await conn.reply(m.chat, global.wait, m)
conn.sendButton(m.chat, `_${command}_`.trim(), `*◈•@${who.split("@s.whatsapp.net")[0]}*`, haha.data, [['🔄 NEXT 🔄', `/${command}`]], fgif, { mentions: [who] })}

}
handler.command = ['mountain', 'pubg', 'wpgaming', 'wpaesthetic', 'wprandom', 'coffee', 'pentol', 'cartoon', 'space', 'technology', 'doraemon', 'hacker', 'planet', 'randomprofile', 'wpaesthetic2', 'wpvehicle', 'wallhp', 'wpmoto']
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
