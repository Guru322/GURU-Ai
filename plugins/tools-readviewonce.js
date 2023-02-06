
let { downloadContentFromMessage } = (await import('@adiwajshing/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.mtype !== 'viewOnceMessage') throw '✳️ Thats not a viewOnce message'
    let msg = m.quoted.message
    let type = Object.keys(msg)[0]
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
    } else if (/image/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
    }
}

handler.help = ['readvo']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'readvo'] 

export default handler
