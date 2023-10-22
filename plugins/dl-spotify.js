import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import os from 'os';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('No song name provided.');
        throw `*Please enter a song name*`;
    }
    try {
        const apiUrl = `${gurubot}/spotifyinfo?text=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log('Error searching for song:', response.statusText);
            throw 'Error searching for song';
        }
        const data = await response.json();
        const coverimage = data.spty.results.thumbnail;
        const name = data.spty.results.title
        const slink = data.spty.results.url;

        const dlapi = `${gurubot}/spotifydl?text=${encodeURIComponent(text)}`;
        const audioResponse = await fetch(dlapi);
        if (!audioResponse.ok) {
            console.log('Error fetching audio:', audioResponse.statusText);
            throw 'Error fetching audio';
        }
        const audioBuffer = await audioResponse.buffer();
        const tempDir = os.tmpdir();
        const audioFilePath = path.join(tempDir, 'audio.mp3');

        try {
            await fs.promises.writeFile(audioFilePath, audioBuffer);
        } catch (writeError) {
            console.error('Error writing audio file:', writeError);
            throw 'Error writing audio file';
        }

        let doc = {
            audio: {
              url: audioFilePath
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
                sourceUrl: slink,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
        };
        
        await conn.sendMessage(m.chat, doc, { quoted: m });
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        throw '*Error*';
    }
};
handler.help = ['spotify'];
handler.tags = ['downloader'];
handler.command = /^(spotify|song)$/i;

export default handler;
