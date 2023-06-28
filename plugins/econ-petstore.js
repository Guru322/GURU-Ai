let handler = async (m, { conn, command, args }) => {
  let type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  let htki = '––––––『'
  let htka = '』––––––'
  
  //----------HARGA
  let hdog = 2
  let hcat = 2
  let hhorse = 4
  let hfox = 6
  let hpetfood = 950

  let caption = `
🐈 • *ᴄᴀᴛ:* 
➞ ${hcat} ᴘᴇᴛ ᴛᴏᴋᴇɴ🔖
🐕 • *ᴅᴏɢ:*
➞ ${hdog} ᴘᴇᴛ ᴛᴏᴋᴇɴ🔖
🐎 • *ʜᴏʀsᴇ:* 
➞ ${hhorse} ᴘᴇᴛ ᴛᴏᴋᴇɴ🔖
🦊 • *ғᴏx:* 
➞ ${hfox} ᴘᴇᴛ ᴛᴏᴋᴇɴ🔖
🍖 • *ᴘᴇᴛ ғᴏᴏᴅ:*
➞ ${hpetfood} ᴍᴏɴᴇʏ 💹
- - - - - - - - - - - - - - - - - - - - -
${htki} ABILITY ${htka}
➞ 🐈 • ᴄᴀᴛ :
- ɪɴᴄʀᴇᴀsᴇ ʜᴇᴀʟᴛʜ 5% / ʟᴇᴠᴇʟ ᴡʜᴇɴ ᴜsᴇ *.ʜᴇᴀʟ*
➞ 🐕 • ᴅᴏɢ :
- ᴄᴏᴍɪɴɢ sᴏᴏɴ...
➞ 🐎 • ʜᴏʀsᴇ :
- ᴄᴏᴍɪɴɢ sᴏᴏɴ...
➞ 🦊 • ғᴏx :
- ᴄᴏᴍɪɴɢ sᴏᴏɴ...
`

  try {
    if (/petshop/i.test(command)) {
      switch (type) {
        case 'cat':
          if (user.cat > 0) return m.reply('ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ɪᴛ!')
          if (user.pet < hcat) return m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ ᴇɴᴏᴜɢʜ !`)
          global.db.data.users[m.sender].pet -= hcat
          global.db.data.users[m.sender].cat += 1
          conn.sendMessage(m.chat, { text: `*${htki} NEW PET !${htka}*\n\n🎉 Congratulations, you have purchased pet *cat*`, quoted: m })
          break
        case 'dog':
          if (user.dog > 0) return m.reply('ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ɪᴛ!')
          if (user.pet < hdog) return m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ ᴇɴᴏᴜɢʜ !`)
          global.db.data.users[m.sender].pet -= hdog
          global.db.data.users[m.sender].dog += 1
          conn.sendMessage(m.chat, { text: `*${htki} NEW PET !${htka}*\n\n🎉 Congratulations, you have purchased pet *dog*`, quoted: m })
          break
        case 'fox':
          if (user.fox > 0) return m.reply('ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ɪᴛ!')
          if (user.pet < hfox) return m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ ᴇɴᴏᴜɢʜ !`)
          global.db.data.users[m.sender].pet -= hfox
          global.db.data.users[m.sender].fox += 1
          conn.sendMessage(m.chat, { text: `*${htki} NEW PET !${htka}*\n\n🎉 Congratulations, you have purchased pet *fox*`, quoted: m })
          break
        case 'horse':
          if (user.horse > 0) return m.reply('ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ɪᴛ!')
          if (user.pet < hhorse) return m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ ᴇɴᴏᴜɢʜ !`)
          global.db.data.users[m.sender].pet -= hhorse
          global.db.data.users[m.sender].horse += 1
          conn.sendMessage(m.chat, { text: `*${htki} NEW PET !${htka}*\n\n🎉 Congratulations, you have purchased pet *horse*`, quoted: m })
          break
        case 'petfood':
          if (global.db.data.users[m.sender].money >= hpetfood) {
            global.db.data.users[m.sender].petFood += 1
            global.db.data.users[m.sender].money -= hpetfood
            conn.sendMessage(m.chat, { text: `*${htki} BUYING ${htka}*\n\nSuccessful purchase of *1* pet food for *${hpetfood}* money!`, quoted: m })
          } else {
            conn.sendMessage(m.chat, { text: `Your money is not enough to buy pet food!`, quoted: m })
          }
          break
        default:
          conn.sendMessage(m.chat, { text: `*${htki} PET SHOP ${htka}*\n\n${caption}` }, { quoted: m })
          break
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['petshop']
handler.tags = ['rpg']
handler.command = /^(petshop)/i

export default handler
