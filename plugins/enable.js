let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let type = (args[0] || '').toLowerCase()
  let state = (args[1] || '').toLowerCase()
  
  if (/^(on|off)$/i.test(command)) {
    state = command.toLowerCase()
    type = (args[0] || '').toLowerCase()
  }
  
  let isEnable = /true|enable|on|1/i.test(state)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let isAll = false, isUser = false
  
  if (!type) {
    return m.reply(`\n*Usage:*\n  ${usedPrefix}enable <option> on/off\n  ${usedPrefix}on <option>\n  ${usedPrefix}off <option>\n\n*Examples:*\n  ${usedPrefix}enable welcome on\n  ${usedPrefix}on welcome\n  ${usedPrefix}off grouponly\n\n*Available options:*\n  welcome, grouponly, onlydm, chatbot, antilink, nsfw, detect, autosticker, antispam, antidelete, antitoxic, restrict, autotype, anticall\n`)
  }
  
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break;
    case 'detect':
    case 'detector':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break;
    case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autosticker = isEnable
      break;
    case 'antispam':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiSpam = isEnable
      break;
    case 'antidelete':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiDelete = isEnable
      break;
    case 'antitoxic':
    case 'antibadword':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = isEnable
      break;
    case 'antilink':
    case 'antilinkwa':
    case 'antilinkwha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break;
    case 'nsfw':
    case '+18':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break;
    case 'chatbot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.chatbot = isEnable
      break;
    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break;
    case 'autotype':
    case 'alwaysonline':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      chat.autotype = isEnable
      break;
    case 'anticall':
    case 'nocall':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.antiCall = isEnable
      break;
    case 'onlypv':
    case 'onlydm':
    case 'onlymd':
    case 'solopv':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.pconly = isEnable
      break;
    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    case 'sologrupo':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.gconly = isEnable
      break;
    default:
      return m.reply(`\n*Unknown option:* ${type}\n\n*Usage:*\n  ${usedPrefix}enable <option> on/off\n  ${usedPrefix}on <option>\n  ${usedPrefix}off <option>\n\n*Examples:*\n  ${usedPrefix}enable welcome on\n  ${usedPrefix}on welcome\n  ${usedPrefix}off grouponly\n\n*Available options:*\n  welcome, grouponly, onlydm, chatbot, antilink, nsfw, detect, autosticker, antispam, antidelete, antitoxic, restrict, autotype, anticall\n`)
  }
  m.reply(`\n✅ *${type}* is now *${isEnable ? 'ON' : 'OFF'}* ${isAll ? 'for the bot' : ''}`.trim())
}
handler.help = ['enable <option> on/off', 'on <option>', 'off <option>']
handler.tags = ['config']
handler.command = /^((en|dis)able|(turn)?o(n|ff)|[01])$/i
handler.desc = 'Enable or disable various features for the bot or group. Use "enable" or "on" to turn on, and "disable" or "off" to turn off. Type "enable" without any options to see available options.'

export default handler