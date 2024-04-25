let handler = async (m, { conn, text, usedPrefix, command }) => {
  let regex = /x/g
  if (!text) throw 'Give a number to search'
  if (!text.match(regex)) throw `*Example: ${usedPrefix + command} 91760590201x*`
  let random = text.match(regex).length,
    total = Math.pow(10, random),
    array = []
  for (let i = 0; i < total; i++) {
    let list = [...i.toString().padStart(random, '0')]
    let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net'
    if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) {
      let info = await conn.fetchStatus(result).catch(_ => {})
      array.push({ exists: true, jid: result, ...info })
    } else {
      array.push({ exists: false, jid: result })
    }
  }
  let txt =
    'Registered\n\n' +
    array
      .filter(v => v.exists)
      .map(
        v =>
          `• Link: wa.me/${v.jid.split('@')[0]}\n*• Bio:* ${v.status || 'descripiion'}\n*• set on:* ${formatDate(v.setAt)}`
      )
      .join('\n\n') +
    '\n\n*Not registered*\n\n' +
    array
      .filter(v => !v.exists)
      .map(v => v.jid.split('@')[0])
      .join('\n')
  m.reply(txt)
}
handler.help = ['nowa']
handler.tags = ['tools']
handler.command = /^nowa$/i
export default handler
function formatDate(n, locale = 'in') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, { timeZone: 'Asia/Kolkata' })
}
