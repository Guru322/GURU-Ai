let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Features list with proper formatting
    const features = [
      "✓ MongoDB Authentication",
      "✓ Group Management",
      "✓ Social Media Downloaders",
      "✓ YouTube MP3/MP4 Downloads",
      "✓ Instagram, Facebook, TikTok Downloads",
      "✓ AI Features",
      "✓ Admin Controls",
      "✓ Welcome & Goodbye Messages",
      "✓ Tag All Group Members",
      "✓ Warning System"
    ].join("\n")
    
    // Using the new interactive button format
    await conn.sendMessage(
      m.chat,
      {
        text: `*GURU-Ai Features*\n\n${features}\n\nUse the buttons below to visit our GitHub or check bot's response time!`,
        title: "GURU-Ai",
        subtitle: "Your WhatsApp Assistant",
        footer: "GURU-Ai  © 2025",
        interactiveButtons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "GitHub",
              url: "https://github.com/Guru322"
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "Check Ping",
              id: ".ping"
            })
          }
        ]
      },
      {
        quoted: m
      }
    )
  } catch (e) {
    console.error(e)
    // Fallback message if interactive message fails
    await m.reply('*GURU-Ai Bot Menu*\n\nUse these commands:\n• .help - Show all commands\n• .ping - Check response time\n• .alive - Bot status\n\nVisit: https://github.com/Guru322/GURU-BOT')
  }
}

handler.help = ['menu', 'help', 'h']
handler.tags = ['main']
handler.command = ['menu', 'help', 'h']

export default handler