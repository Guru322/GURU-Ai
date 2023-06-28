let { MessageType } = (await import('@adiwajshing/baileys')).default
import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, command, text }) => {
	 
    let user = global.db.data.users[m.sender]
    let htki = '––––––『'
    let htka = '』––––––'
    let SWORD = user.sword < 1
    let ARMOR = user.armor < 1
    let HEALT = user.health < 90
    if (SWORD || ARMOR || HEALT) {
        const buttons = []

        console.log({SWORD, ARMOR, HEALT})
        if (SWORD) buttons.push({buttonId: `.craft sword`, buttonText: {displayText: 'ᴄʀᴀғᴛ sᴡᴏʀᴅ'}, type: 1})
        if (ARMOR) buttons.push({buttonId: `.craft armor`, buttonText: {displayText: 'ᴄʀᴀғᴛ ᴀʀᴍᴏʀ'}, type: 1})
        if (HEALT) buttons.push({buttonId: `.heal`, buttonText: {displayText: 'ʜᴇᴀʟ'}, type: 1})
        
        let lmao = item(user.sword * 1, user.armor * 1, user.health * 1, usedPrefix)
        if (buttons.length == 0) return m.reply(lmao)   
        const buttonMessage = {
            contentText: `*${htki} DUNGEON ${htka}*`,
            footerText: lmao,
            buttons: buttons,
            headerType: 1
        }
        return conn.reply(m.chat, lmao, false, { quoted: m} )
    }
    global.dungeon = global.dungeon ? global.dungeon : {}
    if (Object.values(global.dungeon).find(room => room.id.startsWith('dungeon') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender))) return m.reply('You are still in the Dungeon') // nek iseh neng njero dungeon
    let timing = (new Date - (user.lastdungeon * 1)) * 1
    if (timing < 600000) return conn.sendButton(m.chat, `*${htki} COOLDOWN ${htka}*`, `ʏᴏᴜ ʜᴀᴠᴇ ɢᴏɴᴇ ᴛᴏ ᴛʜᴇ ᴅᴜɴɢᴇᴏɴ, please wait...\n➞ ${clockString(600000 - timing)}`, null, [['WAIT', '']],m) // Cooldown
    let room = Object.values(global.dungeon).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    if (room) {

      // Biar simple :v
      let p1 = room.game.player1 || ''
      let p2 = room.game.player2 || ''
      let p3 = room.game.player3 || ''
      let p4 = room.game.player4 || ''
      let c1 = room.player1 || ''
      let c2 = room.player2 || ''
      let c3 = room.player3 || ''
      let c4 = room.player4 || ''

      if (!p2) {
        room.player2 = m.chat
        room.game.player2 = m.sender
      } else if (!p3) {
        room.player3 = m.chat
        room.game.player3 = m.sender
      } else if (!p4) {
        room.player4 = m.chat
        room.game.player4 = m.sender
        room.state = 'PLAYING'
      }
        
       const buttons = [
           {buttonId: 'id1', buttonText: {displayText: 'send'}, type: 1}
       ]
        
        let lmao = `${!room.game.player4 ? `[• • •] ᴡᴀɪᴛɪɴɢ ${!room.game.player3 && !room.game.player4 ? '2' : '1'} ᴘʟᴀʏᴇʀ ᴀɢᴀɪɴ... ${room.name ? `\n➞ ᴛʏᴘᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ғᴏʀ ᴊᴏɪɴ *${usedPrefix}${command} ${room.name}*` : ''}` : 'ᴀʟʟ ᴘʟᴀʏᴇʀ ᴀʀᴇ ᴄᴏᴍᴘʟᴀᴛᴇ...'}`
        const buttonMessage = {
            contentText: `DUNGEON`,
            footerText: lmao,
            buttons: buttons,
            headerType: 1
        }
        return conn.reply(m.chat, lmao, false, { quoted: m} )
        
        if (room.game.player1 && room.game.player2 && room.game.player3 && room.game.player4) {

        // Hadiah ben do seneng :v
        room.price.money += (Math.floor(Math.random() * 10000)) * 1
        room.price.exp += (Math.floor(Math.random() * 5001)) * 1
        room.price.iron += (pickRandom([0, 1, 0, 0, 1, 1, 0, 0])) * 1
        room.game.diamond += (pickRandom([0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.game.trash += (Math.floor(Math.random() * 1001)) * 1
        room.price.string += (Math.floor(Math.random() * 5)) * 1
        room.price.wood += (Math.floor(Math.random() * 10)) * 1
        room.price.rock += (Math.floor(Math.random() * 10)) * 1
        room.game.petFood += (pickRandom([0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
        room.game.common += (pickRandom([0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.game.uncommon += (pickRandom([0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0])) * 1

        let str = `
➞ *ʀᴏᴏᴍ ɪᴅ:* ${room.id}
👩‍🏫 *ᴘʟᴀʏᴇʀs:*
▸ ${M(p1)}
▸ ${M(p2)}
▸ ${M(p3)}
▸ ${M(p4)}`.trim()

        await m.reply(str, c1, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
            }
          })
        if (![c1, c3, c4].includes(c2)) m.reply(str, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str)
            }
        })
        if (![c1, c2, c4].includes(c3)) m.reply(str, c3, {
          contextInfo: {
              mentionedJid: conn.parseMention(str)
            }
        })
        if (![c1, c2, c3].includes(c4)) m.reply(str, c4, {
          contextInfo: {
              mentionedJid: conn.parseMention(str)
          }
        })

        setTimeout(async () => {
          let users = global.db.data.users
          let player  = [p1, p2, p3, p4]
          let { health, sword } = room.less
          let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petFood } = room.price  
          let str2 = `
👩‍🏫 *ᴘʟᴀʏᴇʀs:*
• *${M(p1)}*
• *${M(p2)}*
• *${M(p3)}*
• *${M(p4)}* 
- - - - - - - - - - - -
*ʜᴇᴀʟᴛʜ:* -${health * 1}
*ᴅᴜʀᴀʙɪʟɪᴛʏ sᴡᴏʀᴅ:* -${sword * 1} 
*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
*➞ ᴇxᴘ:* ${exp * 4}
*➞ ᴍᴏɴᴇʏ:* ${money * 4}
*➞ ᴛʀᴀsʜ:* ${sampah  * 4}${potion == 0 ? '' : '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion * 4}${petFood == 0 ? '' : '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petFood * 4}${kayu == 0 ? '' : '\n*➞ ᴡᴏᴏᴅ:* ' + kayu * 4}${batu == 0 ? '' : '\n*➞ sᴛᴏɴᴇ:* ' + batu * 4}${string == 0 ? '' : '\n*➞ sᴛʀɪɴɢ:* ' + string * 4}${iron == 0 ? '' : '\n*➞ ɪʀᴏɴ:* ' + iron * 4}${diamond == 0 ? '' : '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond * 4}${common == 0 ? '' : '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common * 4}${uncommon == 0 ? '' : '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon * 4}
             `.trim()
          for (let i = 0; i < player.length; i++) {
            let p = player[i]
            setTimeout(() => {
              users[p].health -= health * 1
              users[p].sworddurability -= sword * 1
              users[p].money += money * 1
              users[p].exp += exp * 1
              users[p].trash += sampah * 1
              users[p].potion += potion * 1
              users[p].diamond += diamond * 1
              users[p].iron += iron * 1
              users[p].wood += kayu * 1
              users[p].rock += batu * 1
              users[p].string += string * 1
              users[p].common += common * 1
              users[p].uncommon += uncommon * 1
              users[p].mythic += mythic * 1
              users[p].legendary += legendary * 1
              users[p].pet += pet * 1
              users[p].petFood += petFood * 1
              users[p].lastdungeon = new Date * 1

              if ((users[p].health * 1) < 1) users[p].health = 0
              if ((users[p].sworddurability * 1) < 1) {
                users[p].sword -= 1
                users[p].sworddurability = (users[p].sword * 1) * 50
              }
            }, (i * 1) * 1500)
          }
            
          await m.reply(str2, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2),
            externalAdReply :{
    mediaUrl: fgyt,
    mediaType: 2,
    description: botname, 
    title: '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -',
    body: botname,
    thumbnail: await(await fetch('https://telegra.ph/file/1836eec6c22d949829474.jpg')).buffer(),
    sourceUrl: fgsc
     }}
  })
          if (![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          })
          if (![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          })
          if (![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(st2)
            }
          })

          if (mythic > 0) {
            let str3 = '🎉 *ᴄᴏɴɢʀᴀᴛs !* 🎉\n• ' + M(p1) + '\n• ' + M(p2) + '\n• ' + M(p3) + '\n• ' + M(p4) +'\nyou get as many Rare items as *' + mythic * 4 + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇs !'
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          if (legendary > 0 || pet > 0) {
            let str3 = (mythic > 0 ? 'ᴀɴᴅ ' : 'ᴄᴏɴɢʀᴀᴛs ' + M(p1) + '\n• ' + M(p2) + '\n• ' + M(p3) + '\n• ' + M(p4) + ' ʏᴏᴜ') + 'ɢᴇᴛ ᴀs ᴍᴀɴʏ ᴇᴘɪᴄ ɪᴛᴇᴍs ᴀs: ' + (pet > 0 && legendary > 0 ? `\n➞ *${legendary * 4}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs\n➞ *${pet * 4}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : pet > 0 && legendary < 1 ? `\n➞ *${pet * 4}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : legendary > 0 && pet < 1 ? `\n➞ *${legendary * 4}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ` : '')
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          // Biar lebih simple
          let _1 = users[p1]
          let _2 = users[p2]
          let _3 = users[p3]
          let _4 = users[p4]
          let _H1 = (_1.health * 1)
          let _H2 = (_2.health * 1)
          let _H3 = (_3.health * 1)
          let _H4 = (_4.health * 1)

          // sd = SwordDurability :v
          let _sd1 = (_1.sworddurability * 1)
          let _sd2 = (_2.sworddurability * 1)
          let _sd3 = (_3.sworddurability * 1)
          let _sd4 = (_4.sworddurability * 1)

          //Peringatan kalau health nya 0 ataupun sword durabilitynya 0
          if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

            //Sama kek atas biar simple aja :v 
            let s1 = (_sd1 * 1) < 1
            let s2 = (_sd2 * 1) < 1
            let s3 = (_sd3 * 1) < 1
            let s4 = (_sd4 * 1) < 1

            //Buat nyimpen data sementara :v
            let HEALT = [], SDH = [], SDM1L = []
            for (let siapa in player) {
              if ((users[siapa].health * 1) < 1) HEALT.push(siapa)
              if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
              if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
            }

            let sI = data(SDH)
            let sH = data(SDM1L)
            let H = data(HEALT)

            let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Dear, please craft ⚔️Sword back by typing *' + usedPrefix + 'craft sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Whereas ⚔️Sword ' : '') + sH + ' Destroyed, and Dropped *1* Level' : ''))}` : ''}${HEALT || HEALT.length > 0 ? `❤️Life ${H} When its finished, please fill in ❤️Life by typing ${usedPrefix}heal` : ''}`
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          //Hapus annunya biar bisa main dungeon lagi :V
          delete global.dungeon[room.id]

        }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
        if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id] //Pastiin lagi kalau masih ada bakal ilang :v
      }
    } else {
        room = {
            id: 'dungeon-' + (+ new Date),
            player1: m.chat,
            player2: '',
            player3: '',
            player4: '',
            state: 'WAITING',
            game: {
                player1: m.sender,
                player2: '',
                player3: '',
                player4: '',
            },
            price: {
                money: (Math.floor(Math.random() * 1001)) * 1,
                exp: (Math.floor(Math.random() * 3001)) * 1,
                sampah: (Math.floor(Math.random() * 1001)) * 1,
                potion: (Math.floor(Math.random() * 5)) * 1,
                diamond: (pickRandom([0, 0, 0, 0, 1, 1, 1, 5, 3, 0, 0])) * 1,
                iron: (Math.floor(Math.random() * 10)) * 1,
                kayu: (Math.floor(Math.random() * 12)) * 1,
                batu: (Math.floor(Math.random() * 10)) * 1,
                string: (Math.floor(Math.random() * 10)) * 1,
                common: (pickRandom([0, 0, 0, 3, 2, 4, 1, 0, 0])) * 1,
                uncommon: (pickRandom([0, 0, 0, 1, 2, 1, 3, 0, 0, 0])) * 1,
                mythic: (pickRandom([0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0])) * 1,
                legendary: (pickRandom([0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0])) * 1,
                pet: (pickRandom([0, 0, 0, 1, 3, 5, 2, 4, 0, 0, 0, 0, 0, 0])) * 1,
                petFood: (pickRandom([0, 0, 0, 1, 4, 3, 6, 0, 0, 0, 0])) * 1,
            },
            less: {
                health: (Math.floor(Math.random() * 101)) * 1,
                sword: (Math.floor(Math.random() * 50)) * 1,
            }
        }
        if (text) room.name = text
        const buttons = [
            {buttonId: 'id1', buttonText: {displayText: 'send'}, type: 1}
        ]
        
        let lmao = '[ • • • ] ᴡᴀɪᴛɪɴɢ ᴘʟᴀʏᴇʀ ' + (text ? `ᴛʏᴘᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ
*${usedPrefix}${command} ${text}*` : '') + '\nᴏʀ ᴛʏᴘᴇ *send* ᴛᴏ ᴘʟᴀʏ'
        const buttonMessage = {
            contentText: `*WAITING*`,
            footerText: lmao,
            buttons: buttons,
            headerType: 1
        }
        conn.sendMessage(m.chat, { text: lmao, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
        global.dungeon[room.id] = room
      }
}

handler.before = function (m) {
  global.dungeon = global.dungeon ? global.dungeon : {}
  let room = Object.values(global.dungeon).find(room => room.id.startsWith('dungeon-') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender) && room.state == 'WAITING')
  if (room) {

    let p1 = room.game.player1 || ''
    let p2 = room.game.player2 || ''
    let p3 = room.game.player3 || ''
    let p4 = room.game.player4 || ''
    let c1 = room.player1 || ''
    let c2 = room.player2 || ''
    let c3 = room.player3 || ''
    let c4 = room.player4 || '' 

    let PLAYER = [room.game.player1]
    if (room.game.player2) PLAYER.push(room.game.player2)
    if (room.game.player3) PLAYER.push(room.game.player3)
    if (room.game.player4) PLAYER.push(room.game.player4)
    let P = data(PLAYER)
    if (/^(sendsolo|dewean)$/i.test(m.text.toLowerCase())) {
        const buttons = [
            {buttonId: 'id1', buttonText: {displayText: 'send'}, type: 1}
        ]
        
        let lmao = '! ʏᴏᴜ ᴄᴀɴᴛ ᴘʟᴀʏ sᴏʟᴏ ʙᴇᴄᴀᴜsᴇ ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ᴀ ᴘᴀʀᴛɴᴇʀ\n➞ ᴘʟᴇᴀsᴇ ᴛʏᴘᴇ *send* ᴛᴏ ᴘʟᴀʏ ᴡɪᴛʜ ᴏᴛʜᴇʀ ᴘᴀʀᴛɴᴇʀs...'
        const buttonMessage = {
          contentText: `*INFO*`,
          footerText: lmao,
          buttons: buttons,
          headerType: 1
      }
  
      if (room.player2 || room.player3 || room.player4) return this.sendMessage(m.chat, buttonMessage, MessageType.buttonsMessage)
      room.state = 'PLAYING'
      let str = `
*➞ ʀᴏᴏᴍ ɪᴅ:* ${room.id}
*👩‍🏫 ᴘʟᴀʏᴇʀ:*
${P}
`.trim()
      m.reply(str, room.player1, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })

      setTimeout(async () => {
        let users = global.db.data.users[p1]
        let { health, sword } = room.less
        let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petFood } = room.price  
        let str2 = `
*• ʜᴇᴀʟᴛʜ:* -${health * 1}
*• sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1} 
- - - - - - - - - - - - - - - - - 
*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
➞ *ᴇxᴘ:* ${exp}
➞ *ᴍᴏɴᴇʏ:* ${money}
➞ *ᴛʀᴀsʜ:* ${sampah}${potion == 0 ? '' : '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion}${petFood == 0 ? '' : '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petFood * 1}${kayu == 0 ? '' : '\n*➞ ᴡᴏᴏᴅ:* ' + kayu}${batu == 0 ? '' : '\n*➞ sᴛᴏɴᴇ:* ' + batu}${string == 0 ? '' : '\n➞ *sᴛʀɪɴɢ:* ' + string}${iron == 0 ? '' : '\n*➞ ɪʀᴏɴ:* ' + iron}${diamond == 0 ? '' : '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond}${common == 0 ? '' : '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common}${uncommon == 0 ? '' : '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon}
`.trim()
        users.health -= health * 1
        users.sworddurability -= sword * 1
        users.money += money * 1
        users.exp += exp * 1
        users.trash += sampah * 1
        users.potion += potion * 1
        users.diamond += diamond * 1
        users.iron += iron * 1
        users.wood += kayu * 1
        users.rock += batu * 1
        users.string += string * 1
        users.common += common * 1
        users.uncommon += uncommon * 1
        users.mythic += mythic * 1
        users.legendary += legendary * 1
        users.pet += pet * 1
        users.petFood += petFood * 1
        users.lastdungeon = new Date * 1
        await m.reply(str2, room.player1, { contextInfo:{ externalAdReply :{
    mediaUrl: fgyt,
    mediaType: 2,
    description: botname, 
    title: '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -',
    body: botname,
    thumbnail: await(await fetch('https://telegra.ph/file/1836eec6c22d949829474.jpg')).buffer(),
    sourceUrl: fgsc
     }}
  })
        if (mythic > 0) {
          let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs ʏᴏᴜ ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs *' + mythic + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
          m.reply(str3, room.player1)
        }
        if (legendary > 0 || pet > 0) {
          let str3 = (mythic > 0 ? 'ᴀɴᴅ' : 'ᴄᴏɴɢʀᴀᴛs') + ' ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs ' + (pet > 0 && legendary > 0 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs ᴀɴᴅ *${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : pet > 0 && legendary < 1 ? `*${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : legendary > 0 && pet < 1 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs` : '')
          m.reply(str3, room.player1)
        }
        if ((users.health * 1) < 1 || (users.sworddurability * 1) < 1) {
          let sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) == 1
          let _sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 1
          let __sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 0
          let health1 = (users.health * 1) < 1
          if (__sword1) {
            users[p1].sword -= 1
            users[p1].sworddurability = 0
          }
          let str3 = `${__sword1 ? `➞ ʏᴏᴜʀ sᴡᴏʀᴅ ${_sword1 ? ` ᴛʜᴇ ʟᴇᴠᴇʟ ɪs ʀᴇᴅᴜᴄᴇᴅ ʙʏ 1 ᴅᴜᴇ ᴛᴏ ᴅᴇsᴛᴜᴄᴛɪᴏɴ` : ` ᴅᴇsᴛʀᴏʏᴇᴅ, ᴘʟᴇᴀsᴇ ᴄʀᴀғᴛ ᴀ sᴡᴏʀᴅ ᴀɢᴀɪɴ ʙʏ ᴛʏᴘɪɴɢ ${usedPrefix}`}craft sword` : ''} ${health1 ? `${__sword1 ? 'ᴀɴᴅ ' : ''}ʏᴏᴜʀ ʟɪғᴇ ɪs ᴏᴠᴇʀ, ᴘʟᴇᴀsᴇ ғɪʟʟ ᴀɢᴀɪɴ ʙʏ ᴛʏᴘɪɴɢ ${usedPrefix}heal` : ''}`
          m.reply(str3, room.player1, {
            contextInfo: {
              mentionedJid: this.parseMention(str3)
            }
          })
        }
        delete global.dungeon[room.id]
      }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
      if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id]

    } else if (/^(s?s?s?s?.?.?.?|tart)$/i.test(m.text.toLowerCase())) {
        let str = `
➞ *ʀᴏᴏᴍ ɪᴅ:* ${room.id}
👩‍🏫 *ᴘʟᴀʏᴇʀ:*
${P}
`.trim()
      m.reply(str, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
        
      for (let _p of PLAYER) {
        room.price.money += (Math.floor(Math.random() * 41)) * 1
        room.price.exp += (Math.floor(Math.random() * 76)) * 1
        room.game.sampah += (Math.floor(Math.random() * 16)) * 1
        room.price.string += (pickRandom([0, 0, 5, 10, 3, 4, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.price.kayu += (pickRandom([0, 0, 0, 1,10, 4, 5, 0, 0, 0, 0, 0, 0])) * 1
        room.price.batu += (pickRandom([0, 0, 0, 5, 10, 3, 4, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.game.common += (pickRandom([0, 0, 0, 3, 4, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
      }

      let users = global.db.data.users
      let orang = PLAYER.length
      let { health, sword } = room.less
      let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petFood } = room.price

      setTimeout(async () => {
        let str2 =`👩‍🏫 *ᴘʟᴀʏᴇʀs:*
${P}
*ʜᴇᴀʟᴛʜ:* -${health * 1} 
*sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1} 
- - - - - - - - - - - - - - - - - -
*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
*➞ ᴇxᴘ:* ${exp * orang}
*➞ ᴍᴏɴᴇʏ:* ${money * orang}
*➞ ᴛʀᴀsʜ:* ${sampah  * orang}${potion == 0 ? '' : '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion * orang}${petFood == 0 ? '' : '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petFood * orang}${kayu == 0 ? '' : '\n*➞ ᴡᴏᴏᴅ:* ' + kayu * orang}${batu == 0 ? '' : '\n*➞ sᴛᴏɴᴇ:* ' + batu * orang}${string == 0 ? '' : '\n*➞ sᴛᴏɴᴇ:* ' + string * orang}${iron == 0 ? '' : '\n*➞ ɪʀᴏɴ:* ' + iron * orang}${diamond == 0 ? '' : '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond * orang}${common == 0 ? '' : '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common * orang}${uncommon == 0 ? '' : '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon * orang}
`.trim()
        await m.reply(str2, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str2),
          externalAdReply :{
    mediaUrl: fgyt,
    mediaType: 2,
    description: botname, 
    title: '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -',
    body: botname,
    thumbnail: await(await fetch('https://telegra.ph/file/1836eec6c22d949829474.jpg')).buffer(),
    sourceUrl: fgsc
     }}
  })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
      }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
      for (let i = 0; i < PLAYER.length; i++) {
        let p = PLAYER[i]
        setTimeout(() => {
          users[p].health -= health * 1
          users[p].sworddurability -= sword * 1
          users[p].money += money * 1
          users[p].exp += exp * 1
          users[p].trash += sampah * 1
          users[p].potion += potion * 1
          users[p].diamond += diamond * 1
          users[p].iron += iron * 1
          users[p].wood += kayu * 1
          users[p].rock += batu * 1
          users[p].string += string * 1
          users[p].common += common * 1
          users[p].uncommon += uncommon * 1
          users[p].mythic += mythic * 1
          users[p].legendary += legendary * 1
          users[p].pet += pet * 1
          users[p].petFood += petFood * 1
          users[p].lastdungeon = new Date * 1

          if ((users[p].health * 1) < 1) users[p].health = 0
          if ((users[p].sworddurability * 1) < 1) {
            users[p].sword -= 1
            users[p].sworddurability = (users[p].sword * 1) * 50
          }
        }, i * 1500)
      }

      // Nak entok item Rare
      if (mythic > 0) {
        let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs 🎉\n ' + P + '\nʏᴏᴜ ɢᴇᴛ ᴀs ᴍᴀɴʏ ʀᴀʀᴇ ɪᴛᴇᴍs ᴀs *' + mythic * orang + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }

      // Nak entok item Epic
      if (legendary > 0 || pet > 0) {
        let str3 = (mythic > 0 ? 'ᴀɴᴅ' : 'ᴄᴏɴɢʀᴀᴛs ' + P + ' ʏᴏᴜ') + ' ɢᴇᴛ ᴀs ᴍᴀɴʏ ᴇᴘɪᴄ ɪᴛᴇᴍs ᴀs ' + (pet > 0 && legendary > 0 ? `*${legendary * orang}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ ᴀɴᴅ *${pet * orang}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : pet > 0 && legendary < 1 ? `*${pet * orang}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : legendary > 0 && pet < 1 ? `*${legendary * orang}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ` : '')
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }

      // Biar lebih simple
      let _1 = users && p1 && users[p1] ? users[p1] : {}
      let _2 = users && p2 && users[p2] ? users[p2] : {}
      let _3 = users && p3 && users[p3] ? users[p3] : {}
      let _4 = users && p4 && users[p4] ? users[p4] : {}
      let _H1 = _1 && _1.health ? (_1.health * 1) : 100
      let _H2 = _2 && _2.health ? (_2.health * 1) : 100
      let _H3 = _3 && _3.health ? (_3.health * 1) : 100
      let _H4 = _4 && _4.health ? (_4.health * 1) : 100

      // sd = SwordDurability :v
      let _sd1 = _1 && _1.sworddurability ? (_1.sworddurability * 1) : 100
      let _sd2 = _2 && _2.sworddurability ? (_2.sworddurability * 1) : 100
      let _sd3 = _3 && _3.sworddurability ? (_3.sworddurability * 1) : 100
      let _sd4 = _4 && _4.sworddurability ? (_4.sworddurability * 1) : 100

      //Peringatan kalau health nya 0 ataupun sword durabilitynya 0
      if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

        //Sama kek atas biar simple aja :v 
        let s1 = _sd1 ? (_sd1 * 1) < 1 : false
        let s2 = _sd2 ? (_sd2 * 1) < 1 : false
        let s3 = _sd3 ? (_sd3 * 1) < 1 : false
        let s4 = _sd4 ? (_sd4 * 1) < 1 : false

        //Buat nyimpen data sementara :v
        let HEALT = [], SDH = [], SDM1L = []
        for (let siapa in PLAYER) {
          if ((users[siapa].health * 1) < 1) HEALT.push(siapa)
          if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
          if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
        }

        // Convert Array to String
        let sI = data(SDH)
        let sH = data(SDM1L)
        let H = data(HEALT)

        let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Destroyed, please craft ⚔️Sword back by typing *' + usedPrefix + 'craft sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Whereas ⚔️Sword ' : '') + sH + ' Destroyed, and Dropped *1* Level' : ''))}` : ''}${HEALT || HEALT.length > 0 ? `❤️
        life ${H} When its finished, please fill in ❤️Life by typing ${usedPrefix}heal` : ''}`
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }
      delete global.dungeon[room.id]
    } 
    if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id] 
  }

  return 
}

handler.help = ['dungeon'].map(v => v + ' [custom room name]')
handler.tags = ['rpg']
handler.command = /^(dungeon)$/i
handler.level = 0

handler.mods = false

export default handler

/**
 * pickRandom from array
 * @param {Array} list 
 * @returns *
 */
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

/**
 * Message if the conditions are not met
 * @param {Number} sword 
 * @param {Number} armor 
 * @param {Number} healt 
 * @param {String} usedPrefix 
 * @returns String
 */
function item(sword, armor, health, usedPrefix) {
  let sw = (sword * 1) < 1
  let a = (armor * 1) < 1
  let h = (health * 1) < 90
  let str = `
${sw ? '➞ ʏᴏᴜ ᴅᴏɴ\'ᴛ ʜᴀᴠᴇ ᴀ sᴡᴏʀᴅ ʏᴇᴛ' : ''}${sw && a && h ? ',' : sw && a ? ' ᴀɴᴅ ' : ''} ${a ? 'ᴀʀᴍᴏʀ !' : ''}${sw && a && h ? '\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ᴍᴜsᴛ ʙᴇ ᴀᴛ ʟᴇᴀsᴛ 90' : h ? '\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ᴍᴜsᴛ ʙᴇ ᴀᴛ ʟᴇᴀsᴛ 90' : ''}\n- - - - - - - - - - - - - - - \n${sw ? `\n「🗡️」• ᴛᴏ ɢᴇᴛ sᴡᴏʀᴅ, ᴛʏᴘᴇ: *${usedPrefix}craft sword*` : ''}${a ? `\n「🥼」• ᴛᴏ ɢᴇᴛ ᴀʀᴍᴏʀ, ᴛʏᴘᴇ: *${usedPrefix}craft armor*` : ''}${h ? `\n「❤️」• ᴛᴏ ɪɴᴄʀᴇᴀsᴇ, ᴛʏᴘᴇ: *${usedPrefix}heal*` : ''}
  `.trim()
  return str
}

/**
 * To split jid
 * @param {String} jid 
 * @returns String
 */
function M(jid) {
  return '@' + jid.split('@')[0]
}

/**
 * To clock
 * @param {Number} ms 
 * @returns String
 */
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, ' H ', m, ' M ', s, ' S'].map(v => v.toString().padStart(2, 0) ).join(':')
}

/**
 * Get data in Array
 * @param {Array} DATA ( avaible array length is 4)
 * @returns String
 */
function data(DATA) {
  let panjang = DATA.length * 1
  let msg = ''
  DATA.forEach(player => {
    if (panjang == 1) msg += `*${M(player)}*` 
    else {
      if (DATA.indexOf(player) !== (panjang - 1)) msg += `*${M(player)}*, ` 
      else msg += `ᴀɴᴅ *${M(player)}*`
    }
  })
  return msg
}