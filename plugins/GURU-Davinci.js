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
