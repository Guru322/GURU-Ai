let handler = async (m, { conn, usedPrefix, command }) => {
    let bot = conn.user.jid
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
    let img = await q.download()
    if (!img) throw `*IMAGE NOT FOUND, PLEASE REPLY TO AN IMAGE USING THE COMMAND ${usedPrefix + command}*`
    await conn.updateProfilePicture(bot, img)
    conn.reply(m.chat, '*SUCCESSFULLY CHANGED THE PROFILE PICTURE OF THE BOT NUMBER*', m)
    } else throw `*IMAGE NOT FOUND, PLEASE REPLY TO AN IMAGE USING THE COMMAND ${usedPrefix + command}*`}
    handler.command = /^setppbot$/i
    handler.owner = true
    export default handler