import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const response = await axios.get('https://shizoapi.cyclic.app/api/memes/cheems?apikey=shizo', {
      responseType: 'arraybuffer',
    });

    const memeData = response.data;
    const buffer = Buffer.from(memeData, 'binary');
    conn.sendFile(m.chat, buffer, 'meme.jpg', '', m);
    m.react('😆');
  } catch (error) {
    console.error(error);
    m.reply('Sorry, an error occurred while fetching the meme.');
  }
};

handler.help = ['meme'];
handler.tags = ['img'];
handler.command = ['meme', 'memes'];
handler.diamond = true;

export default handler;
