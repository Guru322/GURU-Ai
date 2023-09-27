import fetch from 'node-fetch';

const endpoint = 'https://v2-guru-indratensei.cloud.okteto.net/perplexity?query=';

let handler = async (m, { text, usedPrefix, command }) => {
  try {
    if (!text && !(m.quoted && m.quoted.text)) {
      throw `Please provide some text or quote a message to get a response.`;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`;
      if (m.quoted.text.includes('.aisearch')) {
        text = text.replace('.aisearch', ''); // 
      }
    }

    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const response = await fetch(endpoint + prompt);

    if (!response.ok) {
      throw `Received an error response from the server: ${response.status} - ${response.statusText}`;
    }

    const data = await response.json();
    const result = data.response.trim(); 
    m.reply(result);
  } catch (error) {
    console.error('Error:', error);
    m.reply(`An error occurred while processing your request. Please try again later.`);
  }
};

handler.command = ['aisearch', 'a2']; 
handler.diamond = false;

export default handler;
