let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  let img = global.API('fgmods', '/api/xnxxmaker', 'apikey', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png'), 
  }, {username: ${name})
conn.sendFile(m.chat, img, 'logo.png', `✅ Result`, m)
	m.react(done)
}


handler.help = ['xmake @user']
handler.tags = ['fun']
handler.command = ['xmake'] 

export default handler
