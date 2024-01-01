

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "https://cdn.jsdelivr.net/gh/badboy22bb/REHMAN-BOT@main/Assets/mp3/y2mate.com%20-%20OG%20%20OUTLAW%20%20Sidhu%20Moosewala%20X%20Shubh%20MegaMix%20By%20Dj%20Jit%20%20Latest%20Punjabi%20Mashup%202023.mp3"
    let url = "https://github.com/Guru322/GURU-BOT"
    let murl = "https://youtu.be/DibiLc17dh0?si=xp9bQ-_frEyDB1-i"
    let img = "https://telegra.ph/file/cf536b0ee6b71234e387e.jpg"
    let con = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Guru",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "*🫀🄼 ˻𝐈ʈͥ᥊ ϻaͣŋͫŋ̑ο̑˼²⁴⁶ ᴡᴀ ʙᴏᴛ ᴛᴇᴀᴍ*",
          body: "GURU BOT",
          thumbnailUrl: img,
          sourceUrl: 'https://Wa.me//+60142568861 ',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
    
      await conn.sendMessage(m.chat, doc, { quoted: con });
    
    }
    
    handler.help = ['alive']
    handler.tags = ['main']
    handler.command = /^(alive)$/i 

    export default handler;
