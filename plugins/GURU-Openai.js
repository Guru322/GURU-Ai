import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*Enter a request or an order to use ChatGpt*\n\n*Example*\n* ${usedPrefix + command} Latest Netflix series*\n* ${usedPrefix + command} write a JS code*`;

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
