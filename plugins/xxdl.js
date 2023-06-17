import fetch from 'node-fetch';
import fg from 'api-dylux';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {

  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 this group does not support nsfw \n\nto turn on  \n*${usedPrefix}enable* nsfw`;
  let user = global.db.data.users[m.sender].age;
  if (user < 17) throw `❎ age must be 18 to use this feature`;
  if (!text) throw `✳️ what to search?\n📌 Use : *${usedPrefix + command} <search>*\n\nExample:- Hot desi bhabi or you can use link also\nExample .xnxx link *`;
    
  m.react(rwait);

  // Validate if the input is a URL
  let url;
  try {
    url = new URL(text);
  } catch (_) {
    url = null;  
  }

  if (url && (url.protocol === "http:" || url.protocol === "https:")) {
    if (!url.hostname.includes('xnxx.com')) return m.reply(`❎ Invalid link  *xnxx.com*`);
    try {
      let xn = await (await fetch(global.API('fgmods', '/api/dowloader/xnxxdl', { url: text }, 'apikey'))).json()
      conn.sendFile(m.chat, xn.result.files.high, xn.result.title + '.mp4', `
  ≡  *XNXX DL*
            
  ▢ *📌Title*: ${xn.result.title}
  ▢ *⌚Duration:* ${xn.result.duration}
  ▢ *🎞️Quality:* ${xn.result.quality}
  `.trim(), m, false, { asDocument: chat.useDocument });
      m.react(done);
    } catch (e) {
      m.reply(`🔴 Error : we are trying hard to fix`);
    }
  } else {
    try {
      let res = await fetch(global.API('fgmods', '/api/search/xnxxsearch', { text }, 'apikey'));
      let json = await res.json();
      let listSections = [];
      Object.values(json.result).map((v, index) => {
        listSections.push([`${index}┃ ${v.title}`, [
              ['🎥 MP4', `${usedPrefix}xnxxdl ${v.link}`, `▢ 📌 *Título* : ${v.title}`]
            ]]);
      });
      let ff = json.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n`).join('\n'); 
      if (json.status) m.reply(ff);
    } catch (e) {
      m.reply(`🔴 Error: we are trying hard to fix it`);
    }
  }
};

handler.help = ['xnxx']; 
handler.tags = ['nsfw', 'prem'];
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx']; 
handler.diamond = false;
handler.premium = false;
handler.register = true;

export default handler;
