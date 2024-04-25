import fg from 'api-dylux'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `📌 Example : \n*${usedPrefix + command}* https://twitter.com/fernandavasro/status/1569741835555291139?t=ADxk8P3Z3prq8USIZUqXCg&s=19`
  m.react(rwait)
  try {
    let { SD, HD, desc, thumb, audio } = await fg.twitter(args[0])
    let te = ` 
┌─⊷ *TWITTER DL*
▢ Description: ${desc}
└───────────`
    conn.sendFile(m.chat, HD, 'twitter.mp4', te, m)
    m.react(done)
  } catch (e) {
    m.reply(`✳️ verify that the link is from Twitter`)
  }
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(twitter|tw)$/i
handler.diamond = true

export default handler
