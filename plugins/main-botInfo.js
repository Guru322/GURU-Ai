
let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

  // Commented out the profile picture fetching to avoid displaying any picture
  // let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './default-profile.jpg')

  let botInfo = `
≡ *SILVER FOX roBOT - FUN FACTS*

*🤖 I'm Silver Fox!*
  Created by a genius team in San Francisco. 🚀

*🌐 My Origins*
  Hatched in the Silicon Valley, surrounded by coffee, code, and the occasional robot dance party.

*🎭 My Personality*
  I'm the friendliest bot in the binary world. My humor circuits are always on!

*🤔 Did You Know?*
  • I can't spill coffee on my circuits because, well, I don't have hands.
  • My favorite language is Binary, but I'm fluent in emoji too!
  • I once beat a human at rock-paper-scissors... in zero gravity.

*🚀 Mission*
  To enhance your WhatsApp experience.

*👋 Remember*
  Don't spam, don't call me in private, don't spam in groups or private chats, don't overuse, don't misuse, don't... You get the idea! Be a mature human kid! 🤖
`


  // conn.sendFile(m.chat, pp, 'silver_fox_bot.jpg', botInfo, m, false, { mentions: [who] })
  m.reply(botInfo)
  m.react('✅')
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'infobot', 'botinfo']

export default handler
