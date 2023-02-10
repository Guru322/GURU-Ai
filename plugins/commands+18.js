import axios from "axios"
import fetch from 'node-fetch'
let handler = async (m, {command, usedPrefix, conn}) => {
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 group doesnt supprt nsfw \n\n enable it by \n*${usedPrefix}enable* nsfw`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ uneed to be atleast 18 years`)

if (command == 'hloli') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwloli.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 Smash? 🔄', `/${command}`]], m)}
  
if (command == 'foot') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwfoot.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 😖 🔄', `/${command}`]], m)}
  
if (command == 'hass') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwass.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]      
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 next 🔄', `/${command}`]], m)}
  
if (command == 'bdsm') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwbdsm.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]    
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 SMASH 🔄', `/${command}`]], m)}
  
if (command == 'cum') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/Nsfw/cum.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 🌚 🔄', `/${command}`]], m)}   
  
if (command == 'ero') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwero.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]     
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 smash 🔄', `/${command}`]], m)}
  
if (command == 'femdom') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwfemdom.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 Next 🔄', `/${command}`]], m)} 
  
if (command == 'glass') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfwglass.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 Next 🔄', `/${command}`]], m)}
  
if (command == 'rhentai') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/hentai.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'orgy') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/nsfworgy.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha, [['🔄 Next 🔄', `/${command}`]], m)}
  
if (command == 'tit') {
let resError = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/tetas.json`)).data   
let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/boobs?apikey=fg-dylux`).data
if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, res, [['🔄 Next 🔄', `/${command}`]], m)}
  
if (command == 'booty') {
let resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/booty.json`)).data   
let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/ass?apikey=fg-dylux`).data
if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, res, [['🔄 next 🔄', `/${command}`]], m)}
  
if (command == 'ecchi') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/ecchi.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 Next 🔄', `/${command}`]], m)}
  
if (command == 'furro') {
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/furro.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 Next 🔄', `/${command}`]], m)} 
  
if (command == 'trap') {
let res = await fetch(`https://api.waifu.pics/nsfw/trap`)
let json = await res.json()
let url = json.url
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 next🔄', `/${command}`]], m)} 
  
if (command == 'lesb') {
let resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json`)).data   
let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/lesbian?apikey=fg-dylux`).data
if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, res, [['🔄 Next🔄', `/${command}`]], m)}  
  
if (command == 'panties') {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 next 🔄', `/${command}`]], m)}
  
if (command == 'penis') {
let resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/pene.json`)).data   
let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/penis?apikey=fg-dylux`).data
if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, res, [['🔄 NEXT🔄', `/${command}`]], m)}
  
if (command == 'porn') {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/porno.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'randomxxx') {
let rawjsonn = ['https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/tetas.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/booty.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/porno.json'] 
let rawjson = await rawjsonn[Math.floor(rawjsonn.length * Math.random())]  
let res = (await axios.get(rawjson)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'pechos') {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/pechos.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'yaoi') {
let res = await fetch(`https://nekobot.xyz/api/image?type=yaoi`)
let json = await res.json()
let url = json.message
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'yaoi2') {
let res = await fetch(`https://purrbot.site/api/img/nsfw/yaoi/gif`)
let json = await res.json()
let url = json.link
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'yuri') { 
let res = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/yuri.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]  
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
  
if (command == 'yuri2') {
let resError = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/yuri.json`)).data   
let res = await fetch(`https://purrbot.site/api/img/nsfw/yuri/gif`)
let json = await res.json()
let url = json.link
if (url == '' || !url || url == null) url = await resError[Math.floor(resError.length * Math.random())]
conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 NEXT 🔄', `/${command}`]], m)}
}  
handler.help = ['hloli', 'foot', 'hass', 'bdsm', 'cum', 'ero', 'femdom', 'foot', 'glass', 'orgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 'panties', 'tit', 'booty', 'ecchi', 'furro', 'rhentai', 'trap', 'lesb', 'penis', 'porn', 'randomxxx', 'pechos']
handler.command = ['hloli', 'foot', 'hass', 'bdsm', 'cum', 'ero', 'femdom', 'foot', 'glass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 'panties', 'tetas', 'booty', 'ecchi', 'furro', 'rhentai', 'trap', 'lesb', 'penis', 'porn', 'randomxxx', 'pechos']
handler.tags = ['nsfw']
export default  handler
