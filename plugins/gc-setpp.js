let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/.test(mime)) {
    let img = await q.download()
    if (!img) throw '*REPLY TO AN IMAGE.*'
    await conn
      .updateProfilePicture(m.chat, img)
      .then(_ => m.reply('IMAGE SUCCESSFULLY SET AS PP._*'))
  } else throw '*REPLY TO AN IMAGE.*'
}
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
