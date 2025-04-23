import { promises as fs } from 'fs'
import { join } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let tags = {
  'main': '👑 Main',
  'tools': '🧰 Tools',
  'downloader': '📥 Downloader',
  'group': '👥 Group',
  'owner': '👑 Owner'
}

const defaultMenu = {
  before: `
╭━━━━━━━━━⬣
┃ 💫 *%username* 
┃ *Here are the available commands:*
╰━━━━━━━━━⬣
%readmore`.trimStart(),
  header: '╭━━━⬣ *%category* ⬣━━━┓',
  body: '┃ 👉 *%cmd* %isPremium %isLimit',
  footer: '┗━━━━━━━━⬣\n',
  after: '✔️ *GURU-AI * by @Guru322',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  try {
    const pluginsDir = join(__dirname, '..')
    const pluginFiles = await fs.readdir(pluginsDir)
    
    let commandsMap = {}
    let descMap = {}
    
    for (let file of pluginFiles) {
      if (!file.endsWith('.js')) continue
      
      try {
        const plugin = (await import('../' + file)).default
        
        if (!plugin || !plugin.help || !plugin.tags) continue
        
        const tag = Array.isArray(plugin.tags) ? plugin.tags[0] : plugin.tags
        
        if (!(tag in tags)) continue
        
        let help = Array.isArray(plugin.help) ? plugin.help : [plugin.help]
        const descriptions = plugin.desc || {}
        
        for (let cmd of help) {
          if (!commandsMap[tag]) commandsMap[tag] = []
          commandsMap[tag].push(cmd)
          
          if (plugin.desc) {
            descMap[cmd] = plugin.desc
          }
        }
      } catch (e) {
        console.error(e)
        continue
      }
    }
    
    let tag = args[0]?.toLowerCase()
    
    let text = ''
    
    if (tag && tags[tag]) {
      text = generateMenu(defaultMenu, tags[tag], commandsMap[tag], _p, descMap)
    } else {
      for (let tag in commandsMap) {
        if (commandsMap[tag].length === 0) continue
        text += generateMenu(defaultMenu, tags[tag], commandsMap[tag], _p, descMap)
      }
    }
    
    let readMore = readmore(defaultMenu.before.length)
    let replace = {
      '%readmore': readMore,
      '%username': conn.getName(m.sender),
      '%botname': conn.user.name,
      '%botdate': new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    for (let [key, value] of Object.entries(replace)) {
      text = text.replace(new RegExp(key, 'g'), value)
    }
    
    const githubUrl = 'https://github.com/Guru322'
    
    const urls = [
      ['GitHub Profile', githubUrl]
    ]
    
    const buttons = [
        ['Ping', '.ping']
    ]
    
    await conn.sendButton(
      m.chat,
      text,
      '✧ GURU-AI © 2025 ✧',
      'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg',
      buttons,
      null,
      urls,
      m
    )
    
  } catch (e) {
    console.error(e)
    m.reply('Error generating command list!')
  }
}

function generateMenu(menu, category, commands, prefix, descMap) {
  let text = menu.header.replace(/%category/g, category) + '\n'
  
  for (let command of commands) {
    let desc = descMap[command] || ''
    let cmd = command.replace(/:/g, '')
    
    text += menu.body
      .replace(/%cmd/g, prefix + cmd)
      .replace(/%isPremium/g, '')
      .replace(/%isLimit/g, '')
      .replace(/%desc/g, desc) + '\n'
  }
  
  return text + menu.footer
}

function readmore(length) {
  return String.fromCharCode(8206).repeat(4001 - length)
}

handler.help = ['list', 'listcmd', 'cmdlist']
handler.tags = ['main']
handler.command = /^(list|listcmd|cmdlist)$/i
handler.desc = 'Lists all available commands with their descriptions, organized by category'

export default handler