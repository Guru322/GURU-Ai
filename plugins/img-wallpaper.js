import { wallpaper } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*EXAMPLE USAGE ${usedPrefix + command} Minecraft*`;


  const res = await wallpaper(text);
  const url = res[Math.floor(Math.random() * res.length)];

  // Use fetch to fetch the image using the URL
  const response = await fetch(url);

  // Use 'arrayBuffer()' instead of 'buffer()'
  const buffer = await response.arrayBuffer();

 
  conn.sendFile(m.chat, buffer, 'wallpaper.jpg', `*${text}*`, m);
};

handler.help = [''].map(v => 'wallpaper' + v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(wallpaper)$/i;

export default handler
