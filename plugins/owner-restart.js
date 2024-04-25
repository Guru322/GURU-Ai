import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (conn.user.jid == conn.user.jid) {
    await m.reply('🔄 Restarting Bot...\n Wait a moment')
    process.send('reset')
  } else throw 'eh'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart']

handler.rowner = true

export default handler
