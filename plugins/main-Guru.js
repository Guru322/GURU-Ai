import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const logo = 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' 
  
  const text = `
╭━━━━━━━━━━━━╮
┃ * SOCIALS *
╰━━━━━━━━━━━━╯

Join our official groups & channels to stay connected!

Thank you for your support!
`.trim()

  const buttons = []
  
  const urls = [
    ['GitHub Profile', 'https://github.com/Guru322'],
    ['YouTube Channel', 'https://www.youtube.com/@Asliguru'],
    ['Telegram Channel', 'https://t.me/NAKLI_GURU']
  ]
  
  await conn.sendButton(
    m.chat, 
    text,
    '© GURU-AI  2025', 
    logo, 
    buttons, 
    null, 
    urls,
    m 
  )
  
  m.react('✅')
}

handler.help = ['gpguru']
handler.tags = ['main']
handler.command = ['groups', 'groupguru', 'gugp', 'ggp', 'gpguru']
handler.desc = 'Get the official groups and channels of GURU-Ai'

export default handler
