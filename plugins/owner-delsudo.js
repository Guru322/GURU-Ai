let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
  } else {
    who = m.chat
  }
  if (!who) throw 'Tag the person you want to remove as an Owner!'

  const ownerId = who.split('@')[0]
  const ownerIndex = global.owner.findIndex(owner => owner[0] === ownerId)

  if (ownerIndex === -1) throw 'This person is not an owner!'

  const removedOwner = global.owner.splice(ownerIndex, 1)[0]
  const caption = `@${removedOwner[0]} has been removed as an Owner.`

  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  })
}

handler.help = ['removeowner @user']
handler.tags = ['owner']
handler.command = /^(remove|del|-)(owner|sudo)$/i
handler.owner = true

export default handler
