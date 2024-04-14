let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!global.db.data.chats[m.chat].nsfw)
    throw `🚫 group doesnt supprt nsfw \n\n enable it by \n*${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 17) throw m.reply(`❎ uneed to be atleast 18 years`)
  if (!text) throw `*This command provides sauce from nhentai: ${usedPrefix + command} miku*`
  try {
    m.reply(global.wait)
    let res = await fetch(
      `https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkeysapi}&query=${text}`
    )
    let json = await res.json()
    let aa = json.result[0].id
    let aa2 = json.result[0].title_native
    let res2 = await fetch(`https://api.lolhuman.xyz/api/nhentaipdf/${aa}?apikey=${lolkeysapi}`)
    let json2 = await res2.json()
    let aa3 = json2.result
    await conn.sendMessage(
      m.chat,
      { document: { url: aa3 }, mimetype: 'application/pdf', fileName: `${aa2}.pdf` },
      { quoted: m }
    )
  } catch {
    throw `*ERROR NOT FOUND TRY SEARCHING ANOTHER QUERY*`
  }
}
handler.command = /^(hentai)$/i
export default handler
