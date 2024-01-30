

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "https://github.com/PRINCE-GDS/THE-PRINCE-BOT/raw/main/Assets/mp3/Audio5.mp3"
    let url = "https://github.com/Cyberwarrior125"
    let murl = "https://youtu.be/DibiLc17dh0?si=xp9bQ-_frEyDB1-i"
    let img = "https://i.imgur.com/s8L1CxS.jpg"
    let con = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "𝐂𝐘𝐁𝐄𝐑_𝐖𝐀𝐑𝐑𝐈𝐎𝐑",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "𝐂𝐘𝐁𝐄𝐑_𝐖𝐀𝐑𝐑𝐈𝐎𝐑 𝐁𝐎𝐓 IS ALIVE",
          body: "cyber BOT",
          thumbnailUrl: img,
          sourceUrl: 'https://chat.whatsapp.com/923140053156',
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
