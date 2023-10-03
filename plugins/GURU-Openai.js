import fetch from 'node-fetch';
import displayLoadingScreen from '../lib/loading.js';

let handler = async (m, { text, conn, usedPrefix, command }) => {

  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    await displayLoadingScreen(conn, m.chat);
    let pingMsg = await conn.sendMessage(m.chat, { text: 'Thinking...' });
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);
    const model = 'chatgpt';

    const senderNumber = m.sender.replace(/[^0-9]/g, ''); 
    const session = `GURU_BOT_${senderNumber}`;

    const endpoint = `https://gurugpt.cyclic.app/gpt4?prompt=${prompt}&session=${session}&model=${model}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const result = data.data;

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: result
        }
      }
    }, {})

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.help = ['chatgpt']
handler.tags = ['AI']
handler.command = ['bro', 'chatgpt', 'ai', 'gpt'];

export default handler;

