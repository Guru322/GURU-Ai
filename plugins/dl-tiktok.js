import { tiktokdl } from '@bochilteam/scraper';
import fg from 'api-dylux';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
 if (!args[0] && m.quoted && m.quoted.text) {
  args[0] = m.quoted.text;
}
if (!args[0] && !m.quoted) throw `Give the link of the video Tiktok or quote a tiktok link`;
 if (!args[0].match(/tiktok/gi)) throw `Verify that the link is from TikTok`;
 
 
  let txt = 'Here your Requested video';

  try {
    const { author: { nickname }, video, description } = await tiktokdl(args[0]);
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
    
    if (!url) throw global.error;
    
    conn.sendFile(m.chat, url, 'tiktok.mp4', '', m);
  } catch (err) {
    try {
      let p = await fg.tiktok(args[0]);
      conn.sendFile(m.chat, p.play, 'tiktok.mp4', txt, m);
    } catch {
      m.reply('*An unexpected error occurred*');
    }
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;
