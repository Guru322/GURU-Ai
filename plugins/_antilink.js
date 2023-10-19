const linkRegex = /(https?:\/\/[^\s]+)/i;

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const containsLink = linkRegex.test(m.text)
    let removeParticipant = m.key.participant
    let messageId = m.key.id
    
    if (chat.antiLink && containsLink) {
        const mentionedUser = `@${m.sender.split('@')[0]}`; // Mention the user who sent the link
        await this.reply(m.chat, `*Link Detected!* \n\n${mentionedUser} has been removed for sending a link.`, m)

        if (isBotAdmin) {
            // Remove the participant from the group
            global.db.data.users[m.sender].warn += 1
            return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: removeParticipant }})
        } 
    }
    return !0
}
