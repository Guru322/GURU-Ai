import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

 
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    const response = await fetch(`https://guru-gpt4-prod-gpt4-reverse-o8hyfh.mo1.mogenius.io/api/gpt4?query=${encodeURIComponent(text)}`);
    const data = await response.json();
    const { response: result } = data; 
    m.reply(result.trim()); 
  } catch (error) {
    console.error('Error:', error); 
    throw `*ERROR*`;
  }
};

handler.command = ['bro', 'chatgpt', 'ai', 'siri'];
handler.diamond = false;

export default handler;
