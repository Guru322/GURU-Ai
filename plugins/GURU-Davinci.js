let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*This command generates image from texts*\n\n*—◉ 𝙴xample usage*\n*◉ ${usedPrefix + command} Netaji subhas bose*\n*◉ ${usedPrefix + command} hatsune miku best*`
try {
m.reply('*Processing image *')
let tiores = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`)
await conn.sendFile(m.chat, tiores.data, null, null, m)
} catch {
throw `*INTERNAL ERROR*`
}}
handler.command = ['ai2', 'dalle', 'gen', 'gimg', 'openai2']
export default handler
import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*enter a request or an order to use the chatgpt*\n\n*—◉ 𝙴xample*\n*◉ ${usedPrefix + command}series 2022  netflix*\n*◉ ${usedPrefix + command} write a js code*`
try {
m.reply(`*wait sometime*`)
let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=user-unique-id`)
let hasil = await tiores.json()
m.reply(`${hasil.result}`.trim())
} catch {
throw `*𝙴𝚁𝚁𝙾𝚁*`
}}
handler.command = ['bro', 'chatgpt', 'ai', 'siri']
export default handler
