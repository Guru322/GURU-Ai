let handler = async (m, { conn, usedprefix }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    conn.sendButton(m.chat, '*🚔🚨 𝐋𝐎𝐋𝐈𝐂𝐎𝐍𝐒 like you only belong in jail 🚨🚔*', author, global.API('https://some-random-api.ml', '/canvas/lolice', { 
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    }), [['yo lolicon 💓', `/loli`]], m)}
    
    handler.help = ['lolicon']
    handler.tags = ['maker']
    handler.command = /^(lolicon)$/i
    export default handler