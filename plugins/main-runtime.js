import fs from 'fs';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let _muptime;
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    });
  }
  let muptime = clockString(_muptime * 1000);

  const pluginFiles = fs.readdirSync('./plugins');
  let totalPlugins = pluginFiles.length;

  let uptim = `Bot Uptime:
              🔸 Uptime: ${muptime}
              🔸 Total Plugins: ${totalPlugins}`;

  conn.sendMessage(m.chat, {
    text: uptim,
    contextInfo: {
      externalAdReply: {
        title: "𝐺 𝑈 𝑅 𝑈 𝐵 𝛩 𝑇 𝛧",
        body: "",
        thumbnailUrl: "https://cdn.wallpapersafari.com/94/61/oLMwsy.jpg",
        sourceUrl: "https://chat.whatsapp.com/F3sB3pR3tClBvVmlIkqDJp",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['runtime'];
handler.tags = ['main'];
handler.command = ['runtime', 'uptime'];

export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return `${d}d ${h}h ${m}m ${s}s`.replace(/(^| )0/g, '');
}
