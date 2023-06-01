//import db from '../lib/database.js'

let handler = async (m, { text }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `✳️ Enter the command name`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw `✳️ You can not delete this command`
    delete sticker[hash]
    m.reply(`✅ Command eliminated`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <text>')
handler.tags = ['cmd']
handler.command = ['delcmd']
handler.owner = true

export default handler
