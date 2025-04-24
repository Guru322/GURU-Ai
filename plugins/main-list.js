import { promises as fs } from 'fs'
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
┃ 💫 ${packname}
┃ *Here are the available commands:*
╰━━━━━━━━━⬣
%readmore`.trimStart(),
  header: '╭━━━⬣ *%category* ⬣━━━┓',
  body: '┃ 👉 *%cmd* %isPremium %isLimit',
  footer: '┗━━━━━━━━⬣\n',
  after: '✔️ *GURU-AI *',
}

let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  try {
    const pluginsDir = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'plugins')
    
    let pluginFiles;
    try {
      pluginFiles = await fs.readdir(pluginsDir);
      console.log(`Found ${pluginFiles.length} files in plugins directory`);
    } catch (e) {
      console.error('Error reading plugins directory:', e);
      return m.reply(`Failed to read plugins directory: ${e.message}`);
    }
    
    let commandsMap = {}
    let descMap = {}
    let helpTexts = {}
    
    for (let tag in tags) {
      commandsMap[tag] = [];
    }
    
    let processedCount = 0;
    
    for (let file of pluginFiles) {
      if (!file.endsWith('.js')) continue
      
      try {
        let filePath = path.join(pluginsDir, file);
        const plugin = (await import(filePath)).default;
        
        if (!plugin || !plugin.help || !plugin.tags) continue
        
        processedCount++;
        
        let pluginTags = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags];
        
        for (const tag of pluginTags) {
          if (!(tag in tags)) continue;
          
          let help = Array.isArray(plugin.help) ? plugin.help : [plugin.help];
          
          for (let cmd of help) {
            if (!commandsMap[tag]) commandsMap[tag] = [];
            commandsMap[tag].push(cmd);
            
            if (plugin.desc) {
              descMap[cmd] = plugin.desc;
            }
            
            helpTexts[cmd] = `${_p}${cmd.replace(/:/g, '')}`;
          }
        }
      } catch (e) {
        console.error(`Error processing plugin ${file}:`, e);
        continue
      }
    }
    
    console.log(`Successfully processed ${processedCount} plugins`);
    
    console.log('Commands collected:', Object.keys(commandsMap).map(k => `${k}: ${commandsMap[k].length}`));
    
    let tag = args[0]?.toLowerCase();
    
    let text = defaultMenu.before;
    
    if (tag && tags[tag] && commandsMap[tag]) {
      text += generateMenu(defaultMenu, tags[tag], commandsMap[tag], _p, descMap)
    } else {
      for (let tag in commandsMap) {
        if (!commandsMap[tag] || commandsMap[tag].length === 0) continue;
        text += generateMenu(defaultMenu, tags[tag], commandsMap[tag], _p, descMap)
      }
    }
    
    text += defaultMenu.after;
    
    let replace = {
      '%readmore': readMore(defaultMenu.before.length),
      '%username': conn.getName(m.sender),
      '%botname': conn.user.name || 'GURU-AI',
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
    
    try {
      await conn.sendButton(
        m.chat,
        text,
        '✧ GURU-AI © 2025 ✧',
        'https://cdn.jsdelivr.net/gh/Guru322/GURU-Ai@latest/Assets/Gurulogo.jpg',
        buttons,
        null,
        urls,
        m
      );
      console.log('Message sent successfully');
    } catch (e) {
      console.error('Error sending message:', e);
      m.reply(`Error sending command list: ${e.message}`);
    }
    
  } catch (e) {
    console.error('Main error in list command:', e);
    m.reply(`Error generating command list: ${e.message}`)
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

function readMore(length) {
  return String.fromCharCode(8206).repeat(4001 - length)
}

handler.help = ['list', 'listcmd', 'cmdlist']
handler.tags = ['main']
handler.command = /^(list|listcmd|cmdlist)$/i
handler.desc = 'Lists all available commands with their descriptions, organized by category'

export default handler