import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  const endpoint = 'https://gurugpt.cyclic.app/gpt4'; // New API endpoint

  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const response = await fetch(`${endpoint}?prompt=${encodeURIComponent(text)}&model=llama`);
    const data = await response.json();
    const result = data.data.trim(); // Assuming the response key is "data"
    m.reply(result); 
  } catch (error) {
    console.error('Error:', error); 
    throw `*ERROR*`;
  }
};

handler.command = ['bro', 'chatgpt', 'ai', 'siri'];
handler.diamond = false;

export default handler;
