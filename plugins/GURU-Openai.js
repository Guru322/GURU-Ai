import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  try {
    let quotedMsg = m.quoted ? m.quoted : null;
    let userQuery = quotedMsg ? quotedMsg.text : text;

    if (!userQuery) {
      throw new Error(`Please provide some text or quote a message to get a response.`);
    }

    const response = await fetch(`https://gurugpt4-85987f3ed9b3.herokuapp.com/api/gpt4?query=${encodeURIComponent(userQuery)}`);
    const data = await response.json();
    const { response: result } = data;
    m.reply(result.trim());
  } catch (error) {
    console.error('Error:', error);
    m.reply(`*ERROR*`);
  }
};

handler.command = ['bro', 'chatgpt', 'ai', 'siri'];
handler.diamond = false;

export default handler;
