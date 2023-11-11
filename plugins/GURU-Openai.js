import fetch from 'node-fetch';


let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    m.react(rwait)
    let pingMsg = await conn.sendMessage(m.chat, { text: 'Thinking...' }, {quoted: m});
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);


    const guru1 = `${gurubot}/chatgpt?text=${prompt}`;
    let response = await fetch(guru1);
    let data = await response.json();
    let result = data.result;

 
    if (!result) {
      const model = 'chatgpt';
      const senderNumber = m.sender.replace(/[^0-9]/g, ''); 
      const session = `GURU_BOT_${senderNumber}`;
      const guru2 = `https://gurugpt.cyclic.app/gpt4?prompt=${prompt}&session=${session}&model=${model}`;
      
      response = await fetch(guru2);
      data = await response.json();
      result = data.data;
    }

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: result
        }
      }
    }, {});
    m.react(done)

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};
handler.help = ['chatgpt']
handler.tags = ['AI']
handler.command = ['bro', 'chatgpt', 'ai', 'gpt'];

export default handler;
