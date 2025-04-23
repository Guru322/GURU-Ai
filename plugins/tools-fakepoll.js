let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`
*⚠️ Please provide poll details in the correct format:*

*Usage:* 
${usedPrefix}${command} question|option1|option2|option3...

*Example:*
${usedPrefix}${command} What's your favorite color?|Red|Blue|Green|Yellow

Optionally add vote counts after each option with a colon:
${usedPrefix}${command} Best OS?|Windows:25|MacOS:15|Linux:45|Android:20
    `)
  }

  const parts = text.split('|')
  if (parts.length < 3) {
    return m.reply(`⚠️ Please provide a question and at least 2 options.`)
  }

  const question = parts[0].trim()
  const options = []
  const votes = []

  for (let i = 1; i < parts.length; i++) {
    const optionPart = parts[i].trim()
    if (!optionPart) continue
    
    if (optionPart.includes(':')) {
      const [option, voteCount] = optionPart.split(':')
      options.push(option.trim())
      votes.push(parseInt(voteCount.trim()) || Math.floor(Math.random() * 50) + 1)
    } else {
      options.push(optionPart)
      votes.push(Math.floor(Math.random() * 50) + 1) // Random votes between 1-50
    }
  }

  if (options.length < 2) {
    return m.reply(`⚠️ Please provide at least 2 valid options.`)
  }

  try {
    await conn.sendFakePoll(
      m.chat,
      question,
      options,
      votes,
      m
    )
    
    if (Math.random() > 0.7) { 
      setTimeout(() => {
        m.reply(`*💡 Tip:* You can add specific vote counts using: option:votes format!`)
      }, 2000)
    }
  } catch (error) {
    console.error('Error sending fake poll:', error)
    m.reply(`❌ Error: ${error.message}`)
  }
}

handler.help = ['fakepoll <question>|<option1>|<option2>...']
handler.tags = ['tools']
handler.command = /^(fakepoll|fpoll|fakesurvey)$/i
handler.group = true
handler.owner = true
handler.limit = true
handler.desc = 'Create fake polls with custom options and vote counts'

export default handler