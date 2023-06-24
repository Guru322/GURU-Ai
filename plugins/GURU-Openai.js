import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*enter a request or an order to use the chatgpt*\n\n*—◉ 𝙴xample*\n*◉ ${usedPrefix + command}series 2022  netflix*\n*◉ ${usedPrefix + command} write a js code*`
try {
let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=user-unique-id`)
let hasil = await tiores.json()
m.reply(`${hasil.result}`.trim())
} catch {
throw `*𝙴𝚁𝚁𝙾𝚁*`
}}
handler.command = ['bro', 'chatgpt', 'ai', 'siri']
handler.diamond = false
export default handler
