import { Innertube } from 'youtubei.js';

// Robust YouTube video ID extraction
function extractVideoId(url) {
  // Handles various YouTube URL formats
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
    const yt = await new Innertube();
    const videoId = extractVideoId(args[0]);
    if (!videoId) throw new Error('Could not extract video ID from URL.');
    let info;
    try {
      info = await yt.getInfo(videoId);
    } catch (e) {
      throw new Error('Failed to fetch video info. The video may be private, age-restricted, or unavailable.');
    }
    if (!info || !info.basic_info || !info.streaming_data || !info.streaming_data.formats) {
      throw new Error('No video info found. The video may be private, age-restricted, or unavailable.');
    }
    // Prefer mp4 with audio, fallback to any mp4
    let format = info.streaming_data.formats.find(f => f.mimeType && f.mimeType.includes('video/mp4') && f.audioQuality) ||
                 info.streaming_data.formats.find(f => f.mimeType && f.mimeType.includes('video/mp4')) ||
                 info.streaming_data.formats[0];
    if (!format || !format.url) throw new Error('No direct video URL found.');
    const videoUrl = format.url;
    const filename = `${info.basic_info.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 32)}.mp4`;
    const caption = `\n≡  *GURU YTDL*\n\n▢ *Title:* ${info.basic_info.title}\n▢ *Quality:* ${format.qualityLabel || 'unknown'}`;
    await conn.sendFile(m.chat, videoUrl, filename, caption, m, false, { mimetype: 'video/mp4' });
  } catch (error) {
    console.error('Error in YouTube video download:', error);
    await m.reply(`❎ Error: Could not download the video. ${error.message}`);
  }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']

export default handler

