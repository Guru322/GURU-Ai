//Guru ka Maal Hai 
//Made For Guru Bot
//created on Diwali(12th Nov)
//copy with credits
//lodusheks stay away



let handler = m => m
handler.all = async function (m, conn) {
    var vn = "https://raw.githubusercontent.com/Yuujikun/GURU-BOT/main/Assets/mp3/Guru.mp3"
    let url = "https://github.com/Yuujikun/GURU-BOT"
    let murl = "https://www.instagram.com/black_yuuji?igsh=MzNlNGNkZWQ4Mg=="
    let hash = global.botname
    let img = "https://i.imgur.com/Vjl770z.jpg"
    let num = "2348153995521"

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "JUJUTSU BLACCEN🎴",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "you tagged my owner.Type /help for bot menu",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
         // renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };
	
    let phoneNumber = '';
    if (m.mentionedJid && m.mentionedJid[0]) {
        phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        if (phoneNumber === num) {
          return this.sendMessage(m.chat, doc, { quoted: m });
        }
      } else {
        return
      }
}
export default handler

