const petik = '```'
const items = ['credit', 'exp']
let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
  if (confirmation[m.sender]) return m.reply('You are making a transfer')
  let user = global.db.data.users[m.sender]
  const item = items.filter(v => v in user && typeof user[v] == 'number')
  let lol = `✳️ Correct use of the command 
*${usedPrefix + command}*  credit [amount] [@user]

📌 Example : 
*${usedPrefix + command}* credit 1000 @${m.sender.split('@')[0]}
`.trim()
  const type = (args[0] || '').toLowerCase()
  if (!item.includes(type)) return conn.reply(m.chat, lol, m, { mentions: [m.sender] })
  const count =
    Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, isNumber(args[1]) ? parseInt(args[1]) : 1)) * 1
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : args[2]
        ? args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net'
        : ''
  if (!who) return m.reply('✳️ Tag the user')
  if (!(who in global.db.data.users)) return m.reply(`✳️ User is not in my database`)
  if (user[type] * 1 < count) return m.reply(`✳️  *${type}*  insufficient to transfer`)
  let confirm = `
    Are you sure you want to transfer *₹${count}* to *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ? 

- Have  *60s* 
Reply ${petik}Yes${petik} or ${petik}no${petik}
`.trim()

  m.reply(confirm, null, { mentions: [who] })
  confirmation[m.sender] = {
    sender: m.sender,
    to: who,
    message: m,
    type,
    count,
    timeout: setTimeout(
      () => (m.reply('⏳ Time is over'), delete confirmation[m.sender]),
      60 * 1000
    ),
  }
}

handler.before = async m => {
  if (m.isBaileys) return
  if (!(m.sender in confirmation)) return
  if (!m.text) return
  let { timeout, sender, message, to, type, count } = confirmation[m.sender]
  if (m.id === message.id) return
  let user = global.db.data.users[sender]
  let _user = global.db.data.users[to]
  if (/no?/g.test(m.text.toLowerCase())) {
    clearTimeout(timeout)
    delete confirmation[sender]
    return m.reply('✅ Transfer Canceled')
  }
  if (/yes?/g.test(m.text.toLowerCase())) {
    let previous = user[type] * 1
    let _previous = _user[type] * 1
    user[type] -= count * 1
    _user[type] += count * 1
    if (previous > user[type] * 1 && _previous < _user[type] * 1)
      m.reply(
        `Transaction Successful ✅ \n\n*₹${count}* was transfered to @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`,
        null,
        { mentions: [to] }
      )
    else {
      user[type] = previous
      _user[type] = _previous
      m.reply(
        `❎ Transfer Failed *${count}* ${type} a *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`,
        null,
        { mentions: [to] }
      )
    }
    clearTimeout(timeout)
    delete confirmation[sender]
  }
}

handler.help = ['give'].map(v => v + ' credit [amount] [@tag]')
handler.tags = ['economy']
handler.command = ['payxp', 'transfer', 'give']

handler.disabled = false

export default handler

function isNumber(x) {
  return !isNaN(x)
}
