import { tiktokdl } from '@bochilteam/scraper';
import fg from 'api-dylux';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
  if (!args[0] && m.quoted && m.quoted.text) {
    args[0] = m.quoted.text.trim(); // Nehmen Sie den Benutzernamen aus der zitierten Nachricht
  }
  if (!args[0] && !m.quoted) {
    throw `Geben Sie den Benutzernamen eines TikTok-Nutzers ein, z.B. ${usedPrefix}${command} username`;
  }

  try {
    let res = await fg.ttStalk(args[0]);
    let txt = `
┌──「 *TIKTOK STALK* 
▢ *🔖Name:* ${res.name}
▢ *🔖Benutzername:* ${res.username}
▢ *👥Follower:* ${res.followers}
▢ *🫂Folgt:* ${res.following}
▢ *📌Beschreibung:* ${res.desc}
▢ *🔗 Profil-Link:* https://tiktok.com/@${res.username}
└────────────`;

    await conn.sendFile(m.chat, res.profile, 'tt.png', txt, m);

    for (let video of res.videos) {
      try {
        const { video: videoDetails } = await tiktokdl(video.url);
        const videoUrl = videoDetails.no_watermark2 || videoDetails.no_watermark || 'https://tikcdn.net' + videoDetails.no_watermark_raw || videoDetails.no_watermark_hd;
        
        if (!videoUrl) throw new Error('Fehler beim Abrufen der Video-URL');
        
        await conn.sendFile(m.chat, videoUrl, 'tiktok.mp4', '', m);
      } catch (err) {
        console.error(err);
        m.reply('*Ein unerwarteter Fehler ist aufgetreten beim Herunterladen eines Videos*');
      }
    }
  } catch (err) {
    console.error(err);
    m.reply('*Ein unerwarteter Fehler ist aufgetreten*');
  }
};

handler.help = ['alltiktok'].map((v) => v + ' <username>');
handler.tags = ['downloader'];
handler.command = /^alltiktok$/i;

export default handler;