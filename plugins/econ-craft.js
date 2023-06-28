let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].pedang = global.db.data.users[m.sender].pedang || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0
  let botol = 'Guru'
  let wm = 'Asliguru'

let lgocraft = `
█▀▀▀▀█▀▀▀█▀▀▀▀█
  ᴄʀᴀꜰᴛ ᴛᴀʙʟᴇ
█▄▄▄▄█▄▄▄█▄▄▄▄█`

  let caption = `
▧ Pickaxe ⛏️
▧ Sword ⚔️
▧ Fishingrod 🎣
*❏ RECIPE*
▧ Pickaxe ⛏️
〉 10 Wood
〉 5 Rock
〉 5 Iron
〉 20 String
▧ Sword ⚔️
〉 10 wood
〉 15 Iron
▧ Fishingrod 🎣
〉 10 wood
〉 2 Iron
〉 20 String
▧ Armor 🥼
〉 30 Iron
〉 1 Emerald
〉 5 Diamond
▧ Atm 💳
〉3 Emerald
〉6 Diamond
〉10k Money
`

  try {
    if (/craft|Crafting/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'pickaxe':
          if (user.pickaxe > 0) return m.reply('You already have this')
            if(user.rock < 5 || user.wood < 10 || user.iron < 5 || user.string < 20) return conn.sendMessage(m.chat, { text: `Not enough goods!\nTo make a pickaxe. you need : \n10 wood🪵 \n5 iron⛓\n20 String🕸️\n5 rock1 🪨`, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 5
            user.rock -= 5
            global.db.data.users[m.sender].string -= 20
            global.db.data.users[m.sender].pickaxe += 1
            user.pickaxedurability = 40
            conn.sendMessage(m.chat, { text: "Sucess making 1 pickaxe 🔨", quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            break
          case 'sword':
          if (user.sword > 0) return m.reply(' You already have this')
            if(user.wood < 10 || user.iron < 15) return conn.sendMessage(m.chat, { text: `Not enough goods!\nTo make swords. you need :\n10 Wood🪵\n15 iron⛓️`, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 15
            global.db.data.users[m.sender].sword += 1
            user.sworddurability = 40
            conn.sendMessage(m.chat, { text: "Sucess making 1 sword 🗡️", quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            break
          case 'fishingrod':
          if (user.fishingrod > 0) return m.reply('You already have this')
            if(user.wood < 20 || user.iron < 5 || user.string < 20) return conn.sendMessage(m.chat, { text: `Not enough goods!\nTo make a fishing rod. you need :\n10 wood🪵\n5 iron⛓\n20 String🕸️`, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 2
            global.db.data.users[m.sender].string -= 20
            global.db.data.users[m.sender].fishingrod += 1
            user.fishingroddurability = 40
            conn.sendMessage(m.chat, { text: "Sucess making 1 fishing rod 🎣", quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            break
          case 'armor':
          if (user.armor > 0) return m.reply(' already have this')
            if(user.iron < 15 || user.emerald < 1 || user.diamond < 5) return conn.sendMessage(m.chat, { text: `Not enough goods!\nto make armor. you need :\n30 Iron ⛓️\n1 Emerald ❇️\n5 Diamond 💎`, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            global.db.data.users[m.sender].emerald -= 1
            global.db.data.users[m.sender].iron -= 15
            global.db.data.users[m.sender].diamond -= 5
            global.db.data.users[m.sender].armor += 1
            user.armordurability = 50
            conn.sendMessage(m.chat, { text: "Sucess making 1 Armor 🥼", quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            break
            case 'atm':
          if (user.atm > 0) return m.reply('you already have this')
            if(user.emerald < 3 || user.money < 10000 || user.diamond < 6) return conn.sendMessage(m.chat, { text: `not enough goods!\nto make  atm.you need  :\n10k Money 💹\n3 Emerald ❇️\n6 Diamond 💎`, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            global.db.data.users[m.sender].emerald -= 3
            global.db.data.users[m.sender].money -= 10000
            global.db.data.users[m.sender].diamond -= 6
            global.db.data.users[m.sender].atm += 1
            conn.sendMessage(m.chat, { text: "Sucess making 1 atm 💳", quoted: m, contextInfo: { mentionedJid: [m.sender] } })
            break
            default:
            return conn.sendMessage(m.chat, { text: lgocraft + caption, quoted: m, contextInfo: { mentionedJid: [m.sender] } })
        }
      }
  } catch (e) {
    conn.reply(m.chat, 'Sorry, there was an error running the command!', m)
    if (DevMode) {
      m.reply(`*Error:* ${util.format(e)}`)
    }
  }
}
handler.help = ['crafting']
handler.tags = ['rpg']
handler.command = /^(craft)$/i


export default handler
