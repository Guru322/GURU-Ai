let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link.`
  try {
    await m.reply('⏳ Processing your request, please wait...');
    const streamUrl = `https://ironman.koyeb.app/ironman/dl/yta?url=${encodeURIComponent(args[0])}`;
    const filename = 'audio.mp3';
    const message = {
      audio: { url: streamUrl },
      mimetype: 'audio/mpeg',
      fileName: filename,
      ptt: false
    };
    await conn.sendMessage(m.chat, message, { quoted: m });
  } catch (error) {
    console.error('Error in YouTube audio download:', error);
    await m.reply(`❎ Error: Could not download the audio. ${error.message}`);
  }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta']
handler.desc = 'Download YouTube audio using a URL'

export default handler
