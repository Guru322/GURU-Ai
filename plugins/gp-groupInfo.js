//import db from '../lib/database.js'

let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `
┌──「 *𝙄𝙉𝙁𝙊 𝙂𝙍𝙊𝙐𝙋* 」
▢ *♻️𝙄𝘿:*
   • ${groupMetadata.id}
▢ *🔖𝙉𝘼𝙈𝙀* : 
• ${groupMetadata.subject}
▢ *👥𝙈𝙀𝙈𝘽𝙀𝙍𝙎* :
• ${participants.length}
▢ *🤿𝙂𝙍𝙊𝙐𝙋 𝙊𝙒𝙉𝙀𝙍:*
• @${owner.split('@')[0]}
▢ *🕵🏻‍♂️𝘼𝘿𝙈𝙄𝙉:*
 ${listAdmin}
▢ *🪢 𝙂𝙍𝙊𝙐𝙋 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝙏𝙄𝙊𝙉:*
• ${isBanned ? '✅' : '❎'} Banned
• ${welcome ? '✅' : '❎'} Welcome
• ${detect ? '✅' : '❎'} Detector
• ${del ? '❎' : '✅'} Anti Delete
• ${antiLink ? '✅' : '❎'} Anti Link WhatsApp

*▢  📬 𝙈𝙀𝙎𝙎𝙀𝙂𝙀 𝙎𝙀𝙏𝙏𝙀𝙄𝙉𝙂𝙎:*
• Welcome: ${sWelcome}
• Farewell: ${sBye}
• Promoted: ${sPromote}
• Degraded: ${sDemote}

▢ *📌𝘿𝙀𝙎𝘾𝙍𝙀𝙋𝙏𝙄𝙊𝙉* :
   • ${groupMetadata.desc?.toString() || 'unknown'}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['infogrupo', 'groupinfo', 'infogp'] 
handler.group = true

export default handler
