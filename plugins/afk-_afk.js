//import db from '../lib/database.js'

export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
  ✅ You are freed from the seal 
${user.afkReason ? ' \n▢ *Reason :* ' + user.afkReason : ''}
▢ *Seal Duration :* ${(new Date - user.afk).toTimeString()}
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`
💤 The human u mentioned is sealed🥡⛓️ 

${reason ? '▢ *Reason* : ' + reason : '▢ *Reason* : Without reason'}
▢ *Seal Duration :* ${(new Date - afkTime).toTimeString()}
  `.trim())
    }
    return true
}
