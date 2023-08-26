import fetch from 'node-fetch';
import { support, sticker } from '../lib/sticker.js';
import uploadImage from '../lib/uploadImage.js'
import fs from 'fs';
import os from 'os';
import path from 'path';

let handler = async (m, { conn, text }) => {
  

  try {
   if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }
    if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw '✳️ The user is not found in my database';
     let userPfp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/guru.jpg'); 
    let user = global.db.data.users[who];
    let { name } = global.db.data.users[who];

    m.react(rwait);
   

    let quoteJson = {
      type: "quote",
      format: "png",
      backgroundColor: "#FFFFFF",
      width: 1800,
      height: 200, // Adjust the height value as desired
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: name,
            photo: {
              url: userPfp,
            },
          },
          text: text,
          replyMessage: {},
        },
      ],
    };

   let res = await fetch('https://bot.lyo.su/quote/generate', {
  method: 'POST',
  body: JSON.stringify(quoteJson),
  headers: { 'Content-Type': 'application/json' },
});

if (!res.ok) {
  throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
}

let json = await res.json();

if (!json.result || !json.result.image) {
  throw new Error('Unexpected response structure');
}

let bufferImage = Buffer.from(json.result.image, 'base64');


    // Save the bufferImage to a file
    let tempImagePath = path.join(os.tmpdir(), 'tempImage.png');
    fs.writeFileSync(tempImagePath, bufferImage);

   // Send the image as a file
await conn.sendFile(m.chat, tempImagePath, 'quote.png', 'Here is the quote image:', m);



    // Delete the temp file after using
    fs.unlinkSync(tempImagePath);

    m.react("🤡");

  } catch (e) {
    console.error(e);
    m.react("😭");
  }
};

handler.help = ['quote'];
handler.tags = ['fun'];
handler.command = ['quote'];

export default handler;

