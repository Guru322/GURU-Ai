let { downloadContentFromMessage } = await import('@whiskeysockets/baileys')

var handler = async (m, { conn }) => {
  if (!/viewOnce/.test(m.quoted?.mtype)) throw '✳️❇️ Its Not a ViewOnce Message'
  let mtype = Object.keys(m.quoted.message)[0]
  let buffer = await m.quoted.download()
  let caption = m.quoted.message[mtype].caption || ''
  conn.sendMessage(m.chat, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: m })
}

handler.help = ['readvo']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'readvo']

export default handler
