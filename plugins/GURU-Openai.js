import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

 
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    const response = await fetch(`https://gurugpt4-85987f3ed9b3.herokuapp.com/api/gpt4?query=${encodeURIComponent(text)}`);
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
