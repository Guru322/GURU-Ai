import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolkeysapi}`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
conn.sendButton(m.chat, 'KAWAI', wm, json.result.female, [['🔄 NEXT 🔄', `/${command}`]], m)
conn.sendButton(m.chat, '𝙲𝚄𝚃𝙴', wm, json.result.male, [['🔄 NEXT 🔄', `/${command}`]], m)
}
handler.help = ['ppcouple']
handler.tags = ['wall']
handler.command = /^(couplepp|ppcouple)$/i
export default handler
