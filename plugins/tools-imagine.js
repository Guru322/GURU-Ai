import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*This command generates images from text prompts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`;

  try {
    let imsg = conn.sendMessage(m.chat, {text: 'please wait , while i do some magic'}, { quoted: m });

    const endpoint = `https://vihangayt.me/tools/lexicaart?q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    const dataa = await response.json();

    let data = dataa.data;
    let randomDataIndex = Math.floor(Math.random() * data.length);
    let randomData = data[randomDataIndex];
    let images = randomData.images;
    let randomImageIndex = Math.floor(Math.random() * images.length);
    let img = images[randomImageIndex].url;
    
    
    if (response.ok) {
      
      await conn.sendFile(m.chat, img, 'image.png', null, fcon);


    } else {
      throw '*Image generation failed*';
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['imagine'];
export default handler;
