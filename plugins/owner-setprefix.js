let handler = async(m, { conn, text }) => {
  if (!text) throw `No symbol detected ...`

  // Regular expression to check if the input contains exactly one symbol
  const symbolRegex = /^[^\w\s]{1}$/

  if (!symbolRegex.test(text)) {
    throw `Invalid symbol input. Please provide exactly one symbol as a prefix.`
  }

  // If the input is valid (contains exactly one symbol), update the prefix
  global.prefix = new RegExp('^[' + text.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  await m.reply(`the prefix has been changed to *${text}*`)
}
handler.help = ['.setprefix ', '.setprefix [symbol]']
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

export default handler
