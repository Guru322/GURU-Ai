
function extractVideoId(url) {
  const patterns = [
    /(?:v=|vi=)([a-zA-Z0-9_-]{11})/, // watch?v=ID
    /(?:be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/, // youtu.be/ID, embed/ID, shorts/ID
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/ // youtube.com/v/ID
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link.`
  try {
    await m.reply('⏳ Processing your request, please wait...');
    const streamUrl = `https://ironman.koyeb.app/ironman/dl/v2/ytmp4?url=${encodeURIComponent(args[0])}`;
    const videoId = extractVideoId(args[0]) || 'video';
    const filename = `${videoId}.mp4`;
    await conn.sendFile(m.chat, streamUrl, filename, '', m, false, { mimetype: 'video/mp4' });
  } catch (error) {
    console.error('Error in YouTube video download:', error);
    await m.reply(`❎ Error: Could not download the video. ${error.message}`);
  }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']
handler.desc = 'Download YouTube video using a URL'

export default handler

