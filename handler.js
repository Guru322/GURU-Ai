import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'

/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || [];
    if (!chatUpdate) {
      return;
    }
    this.pushMessage(chatUpdate.messages).catch(console.error);
    let m = chatUpdate.messages[chatUpdate.messages.length - 1];
    if (!m) {
      return;
    }
  
    try {
      m = smsg(this, m) || m;
      if (!m) {
        return;
      }
      m.exp = 0;
      m.money = false;
     
      try {
        // TODO: use loop to insert data instead of this
        const user = global.db.data.users[m.sender];
        if (typeof user !== 'object') {
          global.db.data.users[m.sender] = {};
        }
        if (user) {
            if (!isNumber(user.exp))
            user.exp = 0
        if (!isNumber(user.diamond))
            user.diamond = 10
        if (!isNumber(user.lastclaim))
            user.lastclaim = 0
        if (!('registered' in user))
            user.registered = false
            //-- user registered 
        if (!user.registered) {
            if (!('name' in user))
                user.name = m.name
            if (!isNumber(user.age))
                user.age = -1
            if (!isNumber(user.regTime))
                user.regTime = -1
        }
        //--user number
        if (!isNumber(user.afk))
            user.afk = -1
        if (!('afkReason' in user))
            user.afkReason = ''
        if (!('banned' in user))
            user.banned = false
            if (!isNumber(user.antispam)) user.antispam = 0;
            if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0;
        if (!isNumber(user.warn))
            user.warn = 0
        if (!isNumber(user.level))
            user.level = 0
        if (!('role' in user))
            user.role = 'Novato'
        if (!('autolevelup' in user))
            user.autolevelup = false
        if (!('chatbot' in user))
            user.chatbot = false
        } else {
          global.db.data.users[m.sender] = {
            exp: 0,
            diamond: 10,
            lastclaim: 0,
            registered: false,
            name: m.name,
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            banned: false,
            antispam: 0,
            antispamlastclaim: 0,
            warn: 0,
            level: 0,
            role: 'Novato',
            autolevelup: false,
            chatbot: false,
          };
        }
        
        const chat = global.db.data.chats[m.chat];
        if (typeof chat !== 'object') {
          global.db.data.chats[m.chat] = {};
        }
        if (chat) {
            if (!('isBanned' in chat))
            chat.isBanned = false
        if (!('welcome' in chat))
            chat.welcome = false
        if (!('detect' in chat))
            chat.detect = false
        if (!('sWelcome' in chat))
            chat.sWelcome = ''
        if (!('sBye' in chat))
            chat.sBye = ''
        if (!('sPromote' in chat))
            chat.sPromote = ''
        if (!('sDemote' in chat))
            chat.sDemote = ''
        if (!('delete' in chat))
            chat.delete = true
        if (!('antiLink' in chat))
            chat.antiLink = false
        if (!('viewonce' in chat))
            chat.viewonce = false
        if (!('onlyLatinos' in chat))
            chat.onlyLatinos = false
         if (!('nsfw' in chat))
            chat.nsfw = false
        if (!isNumber(chat.expired))
            chat.expired = 0
        } else {
          global.db.data.chats[m.chat] = {
            isBanned: false,
            welcome: false,
            detect: false,
            sWelcome: '',
            sBye: '',
            sPromote: '',
            sDemote: '',
            delete: true,
            antiLink: false,
            viewonce: false,
            useDocument: true,
            onlyLatinos: false,
            nsfw: false, 
            expired: 0,
          };
        }
        const settings = global.db.data.settings[this.user.jid];
        if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {};
        if (settings) {
            if (!('self' in settings)) settings.self = false
            if (!('autoread' in settings)) settings.autoread = false
            if (!('restrict' in settings)) settings.restrict = false
            if (!('antispam' in settings)) settings.antispam = false;
            if (!('status' in settings)) settings.status = 0  
        } else {
          global.db.data.settings[this.user.jid] = {
            self: false,
                autoread: false,
                restrict: false, 
                antispam: false,
                status: 0
          };
        }
      } catch (e) {
        console.error(e);
      }
      if (opts['nyimak']) {
        return;
      }
      if (!m.fromMe && opts['self']) {
        return;
      }
      if (opts['pconly'] && m.chat.endsWith('g.us')) {
        return;
      }
      if (opts['gconly'] && !m.chat.endsWith('g.us')) {
        return;
      }
      if (opts['swonly'] && m.chat !== 'status@broadcast') {
        return;
      }
      if (typeof m.text !== 'string') {
        m.text = '';
      }
  
      const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
      const isOwner = isROwner || m.fromMe;
      const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
      const isPrems = isROwner || isOwner || isMods || global.db.data.users[m.sender].premiumTime > 0; // || global.db.data.users[m.sender].premium = 'true'
  
      if (opts['queque'] && m.text && !(isMods || isPrems)) {
        const queque = this.msgqueque; const time = 1000 * 5;
        const previousID = queque[queque.length - 1];
        queque.push(m.id || m.key.id);
        setInterval(async function() {
          if (queque.indexOf(previousID) === -1) clearInterval(this);
          await delay(time);
        }, time);
      }
  
      if (m.isBaileys) {
        return;
      }
      m.exp += Math.ceil(Math.random() * 10);
  
      let usedPrefix;
      const _user = global.db.data && global.db.data.users && global.db.data.users[m.sender];
  
      const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch((_) => null)) : {}) || {};
      const participants = (m.isGroup ? groupMetadata.participants : []) || [];
      const user = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) === m.sender) : {}) || {}; // User Data
      const bot = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) == this.user.jid) : {}) || {}; // Your Data
      const isRAdmin = user?.admin == 'superadmin' || false;
      const isAdmin = isRAdmin || user?.admin == 'admin' || false; // Is User Admin?
      const isBotAdmin = bot?.admin || false; // Are you Admin?
  
      const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins');
      for (const name in global.plugins) {
        const plugin = global.plugins[name];
        if (!plugin) {
          continue;
        }
        if (plugin.disabled) {
          continue;
        }
        const __filename = join(___dirname, name);
        if (typeof plugin.all === 'function') {
          try {
            await plugin.all.call(this, m, {
              chatUpdate,
              __dirname: ___dirname,
              __filename,
            });
          } catch (e) {
            // if (typeof e === 'string') continue
            console.error(e)
            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                let data = (await conn.onWhatsApp(jid))[0] || {}
                if (data.exists)
                    m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
            }
          }
        }
        if (!opts['restrict']) {
          if (plugin.tags && plugin.tags.includes('admin')) {
          // global.dfail('restrict', m, this)
            continue;
          }
        }
        const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
        const _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix;
        const match = (_prefix instanceof RegExp ? // RegExp Mode?
                  [[_prefix.exec(m.text), _prefix]] :
                  Array.isArray(_prefix) ? // Array?
                      _prefix.map((p) => {
                        const re = p instanceof RegExp ? // RegExp in Array?
                              p :
                              new RegExp(str2Regex(p));
                        return [re.exec(m.text), re];
                      }) :
                      typeof _prefix === 'string' ? // String?
                          [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                          [[[], new RegExp]]
        ).find((p) => p[1]);
        if (typeof plugin.before === 'function') {
          if (await plugin.before.call(this, m, {
            match,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          })) {
            continue;
          }
        }
        if (typeof plugin !== 'function') {
          continue;
        }
        if ((usedPrefix = (match[0] || '')[0])) {
          const noPrefix = m.text.replace(usedPrefix, '');
          let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
          args = args || [];
          const _args = noPrefix.trim().split` `.slice(1);
          const text = _args.join` `;
          command = (command || '').toLowerCase();
          const fail = plugin.fail || global.dfail; // When failed
          const isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                      plugin.command.test(command) :
                      Array.isArray(plugin.command) ? // Array?
                          plugin.command.some((cmd) => cmd instanceof RegExp ? // RegExp in Array?
                              cmd.test(command) :
                              cmd === command,
                          ) :
                          typeof plugin.command === 'string' ? // String?
                              plugin.command === command :
                              false;
  
          if (!isAccept) {
            continue;
          }
          m.plugin = name;
          if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
            const chat = global.db.data.chats[m.chat];
            const user = global.db.data.users[m.sender];
            const botSpam = global.db.data.settings[this.user.jid];
            if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned)
            return // Except this
        if (name != 'owner-unbanuser.js' && user?.banned)
            return
  
              
          
            if (botSpam.antispam && m.text && user && user.lastCommandTime && (Date.now() - user.lastCommandTime) < 5000 && !isROwner) {
              if (user.commandCount === 2) {
                const remainingTime = Math.ceil((user.lastCommandTime + 5000 - Date.now()) / 1000);
                if (remainingTime > 0) {
                  const messageText = `*hey senpai i am on cooldown , you can use me after ${remainingTime} seconds *`;
                  m.reply(messageText);
                  return;
                } else {
                  user.commandCount = 0;
                }
              } else {
                user.commandCount += 1;
              }
            } else {
              user.lastCommandTime = Date.now();
              user.commandCount = 1;
            }
          }
        
  
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
            fail('owner', m, this);
            continue;
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this);
            continue;
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this);
            continue;
          }
          if (plugin.mods && !isMods) { // Moderator
            fail('mods', m, this);
            continue;
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this);
            continue;
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this);
            continue;
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this);
            continue;
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this);
            continue;
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this);
            continue;
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this);
            continue;
          }
          m.isCommand = true;
          const xp = 'exp' in plugin ? parseInt(plugin.exp) : 17; // XP Earning per command
          if (xp > 200) {
            m.reply('Ngecit -_-');
          } // Hehehe
          else {
            m.exp += xp;
          }
        
          if (plugin.level > _user.level) {
            this.reply(m.chat, `✳️ required level ${plugin.level} to use this command. \nyour level ${_user.level}`, m)
            continue // If the level has not been reached
        }
          const extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          };
          try {
            await plugin.call(this, m, extra);
            
          } catch (e) {
            // Error occured
            m.error = e
            console.error(e)
            if (e) {
                let text = format(e)
                for (let key of Object.values(global.APIKeys))
                    text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                if (e.name)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                    }
                m.reply(text)
            }
        } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
                try {
                    await plugin.after.call(this, m, extra)
                } catch (e) {
                    console.error(e)
                }
            }
            
        }
          break;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (opts['queque'] && m.text) {
        const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
        if (quequeIndex !== -1) {
          this.msgqueque.splice(quequeIndex, 1);
        }
      }
      // console.log(global.db.data.users[m.sender])
      let user; const stats = global.db.data.stats;
      if (m) {
        if (m.sender && (user = global.db.data.users[m.sender])) {
          user.exp += m.exp;
          user.limit -= m.limit * 1;
        }
  
        let stat;
        if (m.plugin) {
          const now = +new Date;
          if (m.plugin in stats) {
            stat = stats[m.plugin];
            if (!isNumber(stat.total)) {
              stat.total = 1;
            }
            if (!isNumber(stat.success)) {
              stat.success = m.error != null ? 0 : 1;
            }
            if (!isNumber(stat.last)) {
              stat.last = now;
            }
            if (!isNumber(stat.lastSuccess)) {
              stat.lastSuccess = m.error != null ? 0 : now;
            }
          } else {
            stat = stats[m.plugin] = {
              total: 1,
              success: m.error != null ? 0 : 1,
              last: now,
              lastSuccess: m.error != null ? 0 : now,
            };
          }
          stat.total += 1;
          stat.last = now;
          if (m.error == null) {
            stat.success += 1;
            stat.lastSuccess = now;
          }
        }
      }
  
      try {
        if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this);
      } catch (e) {
        console.log(m, m.quoted, e);
      }
      
      if (opts['autoread']) await this.readMessages([m.key]);
      
    }
  }

/**
 * Handle groups participants update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
    if (opts['self'])
        return
    // if (id in conn.chats) return // First login will spam
    if (this.isInit)
        return
    if (global.db.data == null)
        await loadDatabase()
    let chat = global.db.data.chats[id] || {}
    let text = ''
    switch (action) {
        case 'add':
        if (chat.welcome) {
          let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata;
          for (let user of participants) {
            let pp, ppgp;
            try {
              pp = await this.profilePictureUrl(user, 'image');
              ppgp = await this.profilePictureUrl(id, 'image');
            } catch (error) {
              console.error(`Error retrieving profile picture: ${error}`);
              pp = 'https://i.imgur.com/8B4jwGq.jpeg'; // Assign default image URL
              ppgp = 'https://i.imgur.com/8B4jwGq.jpeg'; // Assign default image URL
            } finally {
              let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user')
                .replace('@group', await this.getName(id))
                .replace('@desc', groupMetadata.desc?.toString() || 'Desconocido')
                .replace('@user', '@' + user.split('@')[0]);
      
              let nthMember = groupMetadata.participants.length;
              let secondText = `Welcome, ${await this.getName(user)}, our ${nthMember}th member`;
      
              let welcomeApiUrl = `https://wecomeapi.onrender.com/welcome-image?username=${encodeURIComponent(
                await this.getName(user)
              )}&guildName=${encodeURIComponent(await this.getName(id))}&guildIcon=${encodeURIComponent(
                ppgp
              )}&memberCount=${encodeURIComponent(
                nthMember.toString()
              )}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(
                'https://i.imgur.com/8B4jwGq.jpeg'
              )}`;
      
              try {
                let welcomeResponse = await fetch(welcomeApiUrl);
                let welcomeBuffer = await welcomeResponse.buffer();
      
                this.sendFile(id, welcomeBuffer, 'welcome.png', text, null, false, { mentions: [user] });
              } catch (error) {
                console.error(`Error generating welcome image: ${error}`);
              }
            }
          }
        }
        break;
      
      case 'remove':
        if (chat.welcome) {
          let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata;
          for (let user of participants) {
            let pp, ppgp;
            try {
              pp = await this.profilePictureUrl(user, 'image');
              ppgp = await this.profilePictureUrl(id, 'image');
            } catch (error) {
              console.error(`Error retrieving profile picture: ${error}`);
              pp = 'https://i.imgur.com/8B4jwGq.jpeg'; // Assign default image URL
              ppgp = 'https://i.imgur.com/8B4jwGq.jpeg'; // Assign default image URL
            } finally {
              let text = (chat.sBye || this.bye || conn.bye || 'HELLO, @user')
                .replace('@user', '@' + user.split('@')[0]);
      
              let nthMember = groupMetadata.participants.length;
              let secondText = `Goodbye, our ${nthMember}th group member`;
      
              let leaveApiUrl = `https://wecomeapi.onrender.com/leave-image?username=${encodeURIComponent(
                await this.getName(user)
              )}&guildName=${encodeURIComponent(await this.getName(id))}&guildIcon=${encodeURIComponent(
                ppgp
              )}&memberCount=${encodeURIComponent(
                nthMember.toString()
              )}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(
                'https://i.imgur.com/8B4jwGq.jpeg'
              )}`;
      
              try {
                let leaveResponse = await fetch(leaveApiUrl);
                let leaveBuffer = await leaveResponse.buffer();
      
                this.sendFile(id, leaveBuffer, 'leave.png', text, null, false, { mentions: [user] });
              } catch (error) {
                console.error(`Error generating leave image: ${error}`);
              }
            }
          }
        }
        break;
            case 'promote':
   
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```');
          case 'demote':
          
            if (!text) {
              text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```');
            }
            text = text.replace('@user', '@' + participants[0].split('@')[0]);
            if (chat.detect) {
              this.sendMessage(id, {text, mentions: this.parseMention(text)});
            }
            break;
    }
}

/**
 * Handle groups update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc);
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject);
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon);
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke);
        if (!text) continue;
        await this.sendMessage(id, {text, mentions: this.parseMention(text)});
    
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[msg.chat] || {}
        if (chat.delete)
            return
        await this.reply(msg.chat, `
        ≡ deleted a message 
        ┌─⊷  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀 
        ▢ *Number :* @${participant.split`@`[0]} 
        └─────────────
        TO DEACTIVE , PRESS 
        */off antidelete*
        *.enable delete*
`.trim(), msg, {
            mentions: [participant]
        })
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    const msg = {
      rowner: '*ᴏɴʟʏ ᴅᴇᴠᴇʟᴏᴘᴇʀ* • This command can only be used by the *Creator of the bot*',
      owner: '*ᴏɴʟʏ ᴏᴡɴᴇʀ* • This command can only be used by the *Bot Owner',
      mods: '*ᴏɴʟʏ ᴍᴏᴅᴇʀᴀᴛᴏʀ* •This function is only for *For Bot moderators*',
      premium: '*ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ* • This command is for *Premium members only',
      group: '*ɢʀᴏᴜᴘ ᴄʜᴀᴛ* • This command can only be used in groups',
      private: '*ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ* • This command can only be used in the *private chat of the Bot*',
      admin: '*ᴏɴʟʏ ᴀᴅᴍɪɴ* • This command is only for *Group Admins*',
      botAdmin: '*ᴏɴʟʏ ʙᴏᴛ ᴀᴅᴍɪɴ* • To use this command I must be *Admin!*',
      unreg: '*ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ʀᴇɢɪsᴛᴇʀᴇᴅ ʏᴇᴛ* •  Sign in to use this feature Typing:\n\n*/reg name.age*\n\n📌Example : */reg GURU.20*', 
      restrict: '*ʀᴇsᴛʀɪᴄᴛ* • This feature is *disabled*',
    }[type];
    
    if (msg) return m.reply(msg)
  };

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.magenta("✅updated 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
}) 