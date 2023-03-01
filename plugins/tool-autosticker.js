import { sticker } from '../lib/sticker.js'
import * as WSF from 'wa-sticker-formatter'
let handler = m => m

handler.before = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let wm = 'AsliGuru'
    if (chat.autoSticker && !user.banned && !chat.isBanned && !m.fromMe && !m.isBaileys) {
        // try {
        let q = m
        let stiker = false
        let wsf = false
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) return
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) return
            wsf = new WSF.Sticker(img, {
                pack: packname,
                author: author,
                crop: false,
            })
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('Max 10 seconds!')
            let img = await q.download()
            if (!img) return
            wsf = new WSF.Sticker(img, {
                pack: packname,
                author: author,
                crop: false,
            })
        } else if (m.text.split` `[0]) {
            if (isUrl(m.text.split` `[0])) stiker = await sticker(false, m.text.split` `[0], packname, author)
            else return
        }
        if (wsf) {
            await wsf.build()
            const sticBuffer = await wsf.get()
            if (sticBuffer) await this.sendMessage(m.chat, { sticker: sticBuffer }, {
                quoted: m,
                mimetype: 'image/webp',
                ephemeralExpiration: 86400
            })
        }
        if (stiker) await this.sendMessage(m.chat, { sticker: stiker }, {
                quoted: m,
                mimetype: 'image/webp',
                ephemeralExpiration: 86400
            })
        // } finally {
        //     if (stiker) {
        //     }
        // }
    }
    return true
}
export default handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}