import fetch from 'node-fetch';

let gitagptHandler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response. Keep in mind that GitaGPT is still in the testing phase, so it may generate inaccurate responses at times.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);
    const endpoint = `https://ultimetron.guruapi.tech/gita?prompt=${prompt}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const result = data.completion; 

    m.reply(result);
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};
gitagptHandler.help = ['gitagpt']
gitagptHandler.tags = ['AI']
gitagptHandler.command = ['gitagpt'];
gitagptHandler.diamond = false;

export default gitagptHandler;
