import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  
  m.react('🗣️');
  
  const uid = encodeURIComponent(m.sender);
  const msg = encodeURIComponent(text);
  
  const res = await fetch(`http://api.brainshop.ai/get?bid=176001&key=M4fzqfe99b3THOYi&uid=${uid}&msg=${msg}`);
  const json = await res.json();
  
  if (json.cnt) {
    const reply = json.cnt;
    m.reply(reply);
  } else {
    throw json;
  }
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot', 'alexa'];

export default handler;

