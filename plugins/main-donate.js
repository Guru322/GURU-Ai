
let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
≡ *DONATION*
suck my dick
let img = 'https://github.com/troublemaker515/GURU-BOT/blob/main/src/Guru.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m)
}

handler.help = ['donate']
handler.tags = ['main']
handler.command = ['donate'] 

export default handler
