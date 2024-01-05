import fetch from "node-fetch";
import ytdl from 'youtubedl-core';
import yts from 'youtube-yts';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
}) => {
    if (!text) throw `give a text to search Example: *${usedPrefix + command}* sefali odia song`;
    conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {};
    await conn.reply(m.chat, wait, m);
    const result = await searchAndDownloadMusic(text);
    const infoText = `✦ ──『 *GURU PLAYER* 』── ⚝ \n\n [ ⭐ Reply the number of the desired search result to get the Audio]. \n\n` ;

const orderedLinks = result.allLinks.map((link, index) => {
    const sectionNumber = index + 1;
    const {
        title,
        url
    } = link;
    return `*${sectionNumber}.* ${title}`;
});

    const orderedLinksText = orderedLinks.join("\n\n");
    const fullText = `${infoText}\n\n${orderedLinksText}`;
    const {
        key
    } = await conn.reply(m.chat, fullText, m);
    conn.GURUPLAY[m.sender] = {
        result,
        key,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, {
                delete: key
            });
            delete conn.GURUPLAY[m.sender];
        }, 150 * 1000),
    };
};

handler.before = async (m, {
    conn
}) => {
    conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {};
    if (m.isBaileys || !(m.sender in conn.GURUPLAY)) return;
    const {
        result,
        key,
        timeout
    } = conn.GURUPLAY[m.sender];
   
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
        const selectedUrl = result.allLinks[inputNumber - 1].url;
        console.log("selectedUrl", selectedUrl)
    let title = generateRandomName();
        const audioStream = ytdl(selectedUrl, {
            filter: 'audioonly',
            quality: 'highestaudio',
        });
    
      
        
        const tmpDir = os.tmpdir();
        
        
        const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
    
        
        await streamPipeline(audioStream, writableStream);

        const doc = {
            audio: {
            url: `${tmpDir}/${title}.mp3`
            },
            mimetype: 'audio/mpeg',
            ptt: false,
            waveform: [100, 0, 0, 0, 0, 0, 100],
            fileName: `${title}`,
        
        };
    
        await conn.sendMessage(m.chat, doc, { quoted: m });
    
    
       

        
    } else {
        m.reply("Invalid sequence number. Please select the appropriate number from the list above.\nBetween 1 to " + result.allLinks.length);
    }
};

handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(play)$/i;
handler.limit = true;
export default handler;

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        if (!videos.length) return "Sorry, no video results were found for this search.";

        const allLinks = videos.map(video => ({
            title: video.title,
            url: video.url,
        }));

        const jsonData = {
            title: videos[0].title,
            description: videos[0].description,
            duration: videos[0].duration,
            author: videos[0].author.name,
            allLinks: allLinks,
            videoUrl: videos[0].url,
            thumbnail: videos[0].thumbnail,
        };

        return jsonData;
    } catch (error) {
        return "Error: " + error.message;
    }
}


async function fetchVideoBuffer() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        return await response.buffer();
    } catch (error) {
        return null;
    }
}

function generateRandomName() {
    const adjectives = ["happy", "sad", "funny", "brave", "clever", "kind", "silly", "wise", "gentle", "bold"];
    const nouns = ["cat", "dog", "bird", "tree", "river", "mountain", "sun", "moon", "star", "cloud"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return randomAdjective + "-" + randomNoun;
}
