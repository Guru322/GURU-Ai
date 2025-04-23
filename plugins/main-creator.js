function handler(m) {
  const data = global.owner.filter(([id, isCreator]) => id && isCreator)
  this.sendContact(
    m.chat,
    data.map(([id, name]) => [id, name]),
    m
  )
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño', 'Gowner']
handler.desc = 'Get the bot owner\'s contact information'

export default handler
