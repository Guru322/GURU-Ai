import axios from "axios";
import qs from "qs";

class VideoDownloader {
  async youtube({ url: videoUrl }) {
    try {
      const searchData = qs.stringify({ query: videoUrl, vt: "home" });
      const searchResponse = await axios.post("https://ssvid.net/api/ajax/search", searchData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          accept: "*/*",
          "x-requested-with": "XMLHttpRequest"
        }
      });
      if (searchResponse.data.status !== "ok") throw new Error("Failed to fetch video details");
      const { vid, links } = searchResponse.data;
      const mp3Key = links.mp3?.mp3128?.k;
      if (!mp3Key) throw new Error("No MP3 download link found");
      const mp3Data = qs.stringify({ vid: vid, k: mp3Key });
      const mp3Response = await axios.post("https://ssvid.net/api/ajax/convert", mp3Data, {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          accept: "*/*",
          "x-requested-with": "XMLHttpRequest"
        }
      });
      return mp3Response.data;
    } catch (error) {
      throw error;
    }
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link.`
  try {
    const downloader = new VideoDownloader();
    const data = await downloader.youtube({ url: args[0] });
    if (!data || !data.url) throw new Error("No MP3 download URL found");
    await conn.sendFile(m.chat, data.url, data.filename || "audio.mp3", null, m, false, { mimetype: 'audio/mpeg' });
  } catch (error) {
    console.error('Error in YouTube audio download:', error);
    await m.reply(`❎ Error: Could not download the audio. ${error.message}`);
  }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta']

export default handler
