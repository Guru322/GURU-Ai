import { toDataURL } from 'qrcode'
let handler = async (m, { text, conn }) => {
if (!text) throw `*𝙂𝙄𝙑𝙀 𝘼 𝙏𝙀𝙓𝙏 𝙏𝙊 𝘾𝙊𝙉𝙑𝙀𝙍𝙏*`
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '𝙃𝙀𝙍𝙀 𝙐 𝙂𝙊', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <text>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
export default handler
