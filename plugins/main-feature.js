import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = await conn.getName(who)
  let totalf = Object.values(global.plugins).filter(v => v.help && v.tags).length
  let txt = `*乂  B O T  -  F E A T U R E*\n\n`
  txt += `	◦  *Total* : ${totalf}\n`
  txt += author
  await conn.relayMessage(
    m.chat,
    {
      requestPaymentMessage: {
        currencyCodeIso4217: 'USD',
        amount1000: totalf * 1000,
        requestFrom: '0@s.whatsapp.net',
        noteMessage: {
          extendedTextMessage: {
            text: txt,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: true,
              },
            },
          },
        },
      },
    },
    {}
  )
}
handler.help = ['totalfeature']
handler.tags = ['main']
handler.command = /^(feature|totalfeature)$/i
export default handler
