let handler = async (m, { conn }) => {
  global.prefix = new RegExp(
    '^[' +
      (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(
        /[|\\{}()[\]^$+*?.\-\^]/g,
        '\\$&'
      ) +
      ']'
  )
  await m.reply(`PREFIX RESET SUCCESS`)
}
handler.help = ['resetprefix']
handler.tags = ['owner']
handler.command = /^(resetprefix)$/i
handler.desc = 'Reset the prefix of the bot to default'
handler.owner = true

export default handler
