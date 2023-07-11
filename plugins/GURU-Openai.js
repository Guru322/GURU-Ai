import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*Enter a request or an order to use ChatGpt*\n\n*Example*\n* ${usedPrefix + command} Latest Netflix series*\n* ${usedPrefix + command} write a JS code*`;

  try {
    const response = await fetch(`https://guru-scrapper.cyclic.app/api/chatgpt?query=${encodeURIComponent(text)}`);
    const data = await response.json();
    const { text: result } = data.data || {};
    const model = data.data?.detail?.model;
    const creator = data.creator || '';
    const fullResult = `${result}\n\nModel: ${model}\nCreator: ${creator}`;
    m.reply(fullResult.trim());
  } catch (error) {
    console.error('Error:', error); // Log the error
    throw `*ERROR*`;
  }
};

handler.command = ['bro', 'chatgpt', 'ai', 'siri'];
handler.diamond = false;

export default handler;
