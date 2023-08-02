import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*This command generates image from texts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful animegirl*\n*◉ ${usedPrefix + command} elon musk in pink output*`;

  try {
    m.reply('*Please wait, generating images...*');

    const response = await fetch(`https://guru-gpt4-prod-gpt4-reverse-o8hyfh.mo1.mogenius.io/api/imgai?prompt=${encodeURIComponent(text)}&count=2`);
    const data = await response.json();

    
    if (data.images && Array.isArray(data.images)) {
      
      for (const image of data.images) {
        const imageResponse = await fetch(image.url);
        const imageBuffer = await imageResponse.buffer();

        
        await conn.sendFile(m.chat, imageBuffer, null, null, m);
      }
    } else {
      throw '*Image generation failed*';
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
  }
};

handler.command = ['ai2', 'dalle', 'gen', 'gimg', 'openai2'];
export default handler;
