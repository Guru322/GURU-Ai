import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);
    const model = 'llama';
    const endpoint = `https://gurugpt.cyclic.app/gpt4?prompt=${prompt}&model=${model}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const result = data.data; 

   m.reply(result);

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.command = ['bro', 'chatgpt', 'ai', 'gpt'];


export default handler;
