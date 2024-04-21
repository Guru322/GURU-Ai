let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`▢ Group : *${groupMetadata.subject}*\n▢ Members : *${participants.length}*${text ? `\n▢ Message : ${text}\n` : ''}\n┌───⊷ *MENTIONS*\n` + users.map(v => '▢ @' + v.replace(/@.+/, '')).join`\n` + '\n└──✪ GURU ┃ ᴮᴼᵀ ✪──', null, {
        mentions: users
    })
}

handler.help = ['Tagall']
handler.tags = ['group']
handler.command = ['alle']
handler.admin = true
handler.group = true
handler.register = true 
export default handler
