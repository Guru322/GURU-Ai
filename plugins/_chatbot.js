import fetch from 'node-fetch';

const BRAINSHOP_BID = '176001';
const BRAINSHOP_KEY = 'M4fzqfe99b3THOYi';

export async function before(m, { conn }) {
  if (m.isBaileys && m.fromMe) {
    return true;
  }
  
  if (!m.isGroup) {
    return false;
  }
  
  const user = global.db.data.users[m.sender];
  
  if (!user.chatbot) {
    return true;
  }
  
  const uid = encodeURIComponent(m.sender);
  const msg = encodeURIComponent(m.text);
  
  const response = await fetch(`http://api.brainshop.ai/get?bid=${BRAINSHOP_BID}&key=${BRAINSHOP_KEY}&uid=${uid}&msg=${msg}`);
  const data = await response.json();
  
  const reply = data.cnt;
  
  m.reply(reply);
}
