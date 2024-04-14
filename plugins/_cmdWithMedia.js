const { proto, generateWAMessage, areJidsSameUser } = (await import('@whiskeysockets/baileys'))
  .default

export async function all(m, chatUpdate) {
  if (m.isBaileys) return
  if (!m.message) return
  if (!m.msg.fileSha256) return
  if (!(Buffer.from(m.msg.fileSha256).toString('base64') in global.db.data.sticker)) return

  let hash = global.db.data.sticker[Buffer.from(m.msg.fileSha256).toString('base64')]
  let { text, mentionedJid } = hash
  let messages = await generateWAMessage(
    m.chat,
    { text: text, mentions: mentionedJid },
    {
      userJid: this.user.id,
      quoted: m.quoted && m.quoted.fakeObj,
    }
  )
  messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
  messages.key.id = m.key.id
  messages.pushName = m.pushName
  if (m.isGroup) messages.participant = m.sender
  let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append',
  }
  this.ev.emit('messages.upsert', msg)
}
