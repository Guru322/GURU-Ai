/*
recomiendo no usar en wa mod
*/

import fetch from 'node-fetch'
/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys'))
  .default
let handler = async (m, { conn, text, participants }) => {
  let _participants = participants.map(user => user.id)
  let users = (
    await Promise.all(
      text
        .split(',')
        .map(v => v.replace(/[^0-9]/g, ''))
        .filter(
          v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net')
        )
        .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')])
    )
  )
    .filter(v => v[1][0]?.exists)
    .map(v => v[0] + '@c.us')
  const response = await conn.query({
    tag: 'iq',
    attrs: {
      type: 'set',
      xmlns: 'w:g2',
      to: m.chat,
    },
    content: users.map(jid => ({
      tag: 'add',
      attrs: {},
      content: [{ tag: 'participant', attrs: { jid } }],
    })),
  })
  const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
  const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
  const add = getBinaryNodeChild(response, 'add')
  const participant = getBinaryNodeChildren(add, 'participant')
  for (const user of participant.filter(item => item.attrs.error == 403)) {
    const jid = user.attrs.jid
    const content = getBinaryNodeChild(user, 'add_request')
    const invite_code = content.attrs.code
    const invite_code_exp = content.attrs.expiration
    let teks = `✳️ Al usuario @${jid.split('@')[0]} solo lo pueden agregar sus contactos :'v `
    m.reply(teks, null, {
      mentions: conn.parseMention(teks),
    })
    //await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, await conn.getName(m.chat), 'Invitación para unirse a mi grupo de WhatsApp ', jpegThumbnail)
  }
}
handler.help = ['add']
handler.tags = ['group']
handler.command = ['add']
handler.admin = true
handler.group = true
handler.rowner = true
handler.botAdmin = true

export default handler
