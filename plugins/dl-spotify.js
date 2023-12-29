import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import os from 'os';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('No song name provided.');
        throw `*Please enter a song name*`;
    }
  m.react('🎶')
    const query = encodeURIComponent(text);
       let spi = `https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${query}`

       let res1 = await fetch(spi)
       let data1 = await res1.json()
       let link = data1.result[0].link

       let apiurl = `https://vihangayt.me/download/spotify?url=${link}`
       let res = await fetch(apiurl)
         let data = await res.json()
         let buffer = await data.data.url
         let coverimage = data.data.cover_url
         let name = data.song
        let doc = {
            audio: {
              url: buffer
            },
            mimetype: 'audio/mpeg',
            ptt: true,
            waveform:  [100, 0, 100, 0, 100, 0, 100],
            fileName: "Guru",
        
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                title: "↺ |◁   II   ▷|   ♡",
                body: `Now playing: ${name}`,
                thumbnailUrl: coverimage,
                sourceUrl: link,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
        };
        
        await conn.sendMessage(m.chat, doc, { quoted: m });
    
};
handler.help = ['spotify'];
handler.tags = ['downloader'];
handler.command = /^(spotify|song)$/i;

export default handler;
