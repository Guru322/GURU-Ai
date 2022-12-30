import fetch from 'node-fetch'
import axios from 'axios'
let handler = async (m, {conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat.nsfw) throw `🚫 this group doesn't support nsfw enable it by \n*${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 17) throw `❎ ja padhai kar! age must be 18 to use this feature`
  if (!text) throw `✳️ invalid format\n📌 Use : *${usedPrefix}xnxx <search>*\n\n or  URL:\n📌Use : *${usedPrefix}xnxxdl <url>*`
 m.react(rwait)

let type = (command).toLowerCase()
switch (type) {
	case 'xnxxsearch':
  case 'xnxx':
  //if (!text) return m.reply(`✳️ ${msg.search()}`)
  try {
  let res = await fetch(global.API('fgmods', '/api/xnxxsearch', { q: text }, 'apikey'))
  let json = await res.json()
   let listSections = []
	Object.values(json.result).map((v, index) => {
	listSections.push([`${index}┃ ${v.title}`, [
          ['🎥 MP4', `${usedPrefix}xnxxdl ${v.link}`, `▢ 📌 *Títle* : ${v.title}`]
        ]])
	})
	return conn.sendList(m.chat, '  ≡ *XNXX DL*🔎', `\n 🔞 Result:\n *${text}*`, igfg , `Click here`, listSections, m)
	} catch (e) {
    m.reply(`🔴 Error: invalid link`)
     }
  break
  case 'xnxxdl':
  // if (!text) return m.reply(`✳️ ${msg.example()} :\n${usedPrefix + command} https://www.xnxx.com/video-9q1wbf7/full_version_https_is.gd_utbgur_cute_sexy_japanese_amature_girl_sex_adult_douga`)
   try {
  let xn = await (await fetch(global.API('fgmods', '/api/xnxxdl', { url: text }, 'apikey'))).json()
  conn.sendFile(m.chat, xn.result.files.high, xn.result.title + '.mp4', `
 ≡  *XNXX DL*
  
▢ *📌Title*: ${xn.result.title}
▢ *⌚Duration:* ${xn.result.duration}
▢ *🎞️quality:* ${xn.result.quality}
`.trim(), m, false, { asDocument: chat.useDocument })
 m.react(done)
 } catch (e) {
m.reply(`🔴 Error : invalid link`)
}
  break

default:
} 
}
handler.help = ['xnxx 🔎', 'xnxxdl <link>'] 
handler.tags = ['nsfw', 'prem']
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'] 
handler.diamond = 2
handler.premium = false
handler.register = true

export default handler
