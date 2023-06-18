import fetch from 'node-fetch';
import fg from 'api-dylux';

const allowedHosts = ['xnxx.com'];

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 This group does not support NSFW content.\n\nTo turn it on, use: *${usedPrefix}enable* nsfw`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `❎ You must be 18 years or older to use this feature.`;
  if (!text) throw `✳️ What do you want to search?\n📌 Usage: *${usedPrefix + command} <search>*\n\nExample: Hot desi bhabi or you can use a link as well\nExample: .xnxx link *`;
    
  m.react('⌛');

  // Validate if the input is a URL
  let url;
  try {
    url = new URL(text);
    if (!allowedHosts.includes(url.hostname)) throw new Error('Invalid URL');
  } catch (error) {
    url = null;
  }

  if (url) {
    try {
      let xn = await (await fetch(global.API('fgmods', '/api/dowloader/xnxxdl', { url: text }, 'apikey'))).json();
      conn.sendFile(m.chat, xn.result.files.high, xn.result.title + '.mp4', `
        ≡  *XNXX DL*
        
        ▢ *📌Title*: ${xn.result.title}
        ▢ *⌚Duration*: ${xn.result.duration}
        ▢ *🎞️Quality*: ${xn.result.quality}
      `.trim(), m, false, { asDocument: chat.useDocument });
      m.react('✅');
    } catch (e) {
      m.reply(`🔴 Error: We encountered a problem while processing the request.`);
    }
  } else {
    try {
      let res = await fetch(global.API('fgmods', '/api/search/xnxxsearch', { text }, 'apikey'));
      let json = await res.json();
      let listSections = [];
      Object.values(json.result).map((v, index) => {
        listSections.push([`${index}┃ ${v.title}`, [
          ['🎥 MP4', `${usedPrefix}xnxxdl ${v.link}`, `▢ 📌 *Title*: ${v.title}`]
        ]]);
      });
      let ff = json.result.map((v, i) => `${i + 1}┃ *Title*: ${v.title}\n*Link*: ${v.link}\n`).join('\n');
      if (json.status) m.reply(ff);
    } catch (e) {
      m.reply(`🔴 Error: We encountered a problem while processing the request.`);
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
