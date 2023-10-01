import fetch from 'node-fetch'


const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Failed to get buffer", error);
    throw new Error("Failed to get buffer");
  }
}

import GIFBufferToVideoBuffer from '../lib/Gifbuffer.js'; // Import the GIFBufferToVideoBuffer function


let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;

  if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @tag`;

  let user = global.db.data.users[who];
  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);
  m.react(rwait); 

  try {
    const rki = await fetch(`https://api.waifu.pics/sfw/kill`);
    if (!rki.ok) throw await rki.text();

    const jkis = await rki.json();
    const { url } = jkis;

    const gifBuffer = await getBuffer(url)
    const gifToVideoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

   
    conn.sendMessage(
      m.chat,
      { video: gifToVideoBuffer, caption: `(${name2}) killed ${name}`, gifPlayback: true, gifAttribution: 0 },
      { quoted: m }
    );

    
  } catch (error) {
    console.error('Error fetching and converting GIF:', error);
  }

  m.react('🗡️');
}
handler.help = ['kill @tag']
handler.tags = ['anime']
handler.command = /^(kill|matar)$/i


export default handler
