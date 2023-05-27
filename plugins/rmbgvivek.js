import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let img = await q.download()
let url = await uploadImage(img)
let sremovebg = global.API(`https://api.lolhuman.xyz/api/removebg?apikey=${lolkeysapi}&img=${url}`) 
await conn.sendFile(m.chat, sremovebg.data, null, null, m)
} catch (e) {
m.reply('*SORRY AN ERROR OCCURRED*')
}}
handler.command = /^tmrmbg$/i
export default handler
