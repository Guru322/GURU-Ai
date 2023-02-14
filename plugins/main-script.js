let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let text1 = `*https://github.com/Guru322/GURU-BOT*`
let pp = './Guru.jpg'
let buttonMessage= {
'document': { url: `https://github.com/Guru322/GURU-BOT` },
'mimetype': `application/${document}`,
'fileName': `「  𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅 」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': 'https://github.com/Guru322/GURU-BOT',
'mediaType': 2,
'previewType': 'pdf',
'title': 'ʙᴏᴛ  ᴡʜᴀᴛsᴀᴘᴘ',
'body': author,
'thumbnail': pp,
'sourceUrl': 'https://youtube.com/@Asliguru' }},
'caption': text1,
'footer': author,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'MENU'}, type: 1}, 
{buttonId: `${usedPrefix}info`, buttonText: {displayText: 'INFO'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })}
handler.command = ['sc','script']
export default handler
