let handler = async(m, { conn, text }) => {
  if (!text) throw `No symbol detected ...`
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '/').replace(/ + ']')
  await m.reply(`the prefix has been changed to  *${text}*`)
}
handler.help = ['setprefix'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

export default handler
