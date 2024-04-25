import FormData from 'form-data'
import Jimp from 'jimp'

let handler = async (m, { conn, usedPrefix, command }) => {
  switch (command) {
    case 'dehaze':
      {
        conn.enhancer = conn.enhancer ? conn.enhancer : {}
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (!mime) throw `photo?`
        if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
        else conn.enhancer[m.sender] = true
        m.reply(wait)
        let img = await q.download?.()
        let error
        try {
          const This = await processing(img, 'dehaze')
          conn.sendFile(m.chat, This, '', 'Nih...', m)
        } catch (er) {
          error = true
        } finally {
          if (error) {
            m.reply('Proses Gagal :(')
          }
          delete conn.enhancer[m.sender]
        }
      }
      break
    case 'recolor':
      {
        conn.recolor = conn.recolor ? conn.recolor : {}
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (!mime) throw `photo?`
        if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
        else conn.recolor[m.sender] = true
        m.reply(wait)
        let img = await q.download?.()
        let error
        try {
          const This = await processing(img, 'recolor')
          conn.sendFile(m.chat, This, '', 'Nih...', m)
        } catch (er) {
          error = true
        } finally {
          if (error) {
            m.reply('Proses Gagal :(')
          }
          delete conn.recolor[m.chat]
        }
      }
      break
    case 'hdr':
      {
        conn.hdr = conn.hdr ? conn.hdr : {}
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (!mime) throw `photo?`
        if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
        else conn.hdr[m.sender] = true
        m.reply(wait)
        let img = await q.download?.()
        let error
        try {
          const This = await processing(img, 'enhance')
          conn.sendFile(m.chat, This, '', 'Nih...', m)
        } catch (er) {
          error = true
        } finally {
          if (error) {
            m.reply('Proses Gagal :(')
          }
          delete conn.hdr[m.sender]
        }
      }
      break
  }
}
handler.help = ['dehaze', 'recolor', 'hdr']
handler.tags = ['tools']
handler.command = ['dehaze', 'recolor', 'hdr']
export default handler

async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ['enhance', 'recolor', 'dehaze']
    Methods.includes(method) ? (method = method) : (method = Methods[0])
    let buffer,
      Form = new FormData(),
      scheme = 'https' + '://' + 'inferenceengine' + '.vyro' + '.ai/' + method
    Form.append('model_version', 1, {
      'Content-Transfer-Encoding': 'binary',
      contentType: 'multipart/form-data; charset=uttf-8',
    })
    Form.append('image', Buffer.from(urlPath), {
      filename: 'enhance_image_body.jpg',
      contentType: 'image/jpeg',
    })
    Form.submit(
      {
        url: scheme,
        host: 'inferenceengine' + '.vyro' + '.ai',
        path: '/' + method,
        protocol: 'https:',
        headers: {
          'User-Agent': 'okhttp/4.9.3',
          Connection: 'Keep-Alive',
          'Accept-Encoding': 'gzip',
        },
      },
      function (err, res) {
        if (err) reject()
        let data = []
        res
          .on('data', function (chunk, resp) {
            data.push(chunk)
          })
          .on('end', () => {
            resolve(Buffer.concat(data))
          })
        res.on('error', e => {
          reject()
        })
      }
    )
  })
}
