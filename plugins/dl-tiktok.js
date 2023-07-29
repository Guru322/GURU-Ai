import { tiktokdl } from '@bochilteam/scraper';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ Enter a TikTok link\n\n📌 Example: ${usedPrefix + command} https://vm.tiktok.com/ZMYG92bUh/`;
  if (!args[0].match(/tiktok/gi)) throw `❎ Verify that the link is from TikTok`;

  try {
    const { author: { nickname }, video, description } = await tiktokdl(args[0]);
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw;
    if (!url) throw '❎ Error downloading the video';

   

    conn.sendFile(m.chat, url, 'tiktok.mp4', `
┌─⊷ TIKTOK
▢ *Nickname:* ${nickname} ${description ? `\n▢ *Description:* ${description}` : ''}
└───────────`, m);
  } catch (error) {
    // Log the error
    console.error('Error downloading TikTok video:', args[0], error);

    m.reply(`❎ Error downloading the video`);
  }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;


export default handler;
