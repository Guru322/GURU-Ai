import fetch from 'node-fetch';
import { support, sticker } from '../lib/sticker.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

let handler = async (m, { conn, text }) => {
  let userPfp = 'https://i.imgur.com/8B4jwGq.jpeg'; // use this as the default profile picture

  try {
    if (!text && !m.quoted) {
      m.react('❔');
      return m.reply(`Please provide a text (Type or mention a message)!`);
    }

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw '✳️ The user is not found in my database';

    let user = global.db.data.users[who];
    let { name } = global.db.data.users[who];

    m.react(rwait);
    let quoteText = m.quoted ? m.quoted.msg : text ? text : "";

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
          text: quoteText,
          replyMessage: {},
        },
      ],
    };

    let res = await fetch('https://bot.lyo.su/quote/generate', {
      method: 'POST',
      body: JSON.stringify(quoteJson),
      headers: { 'Content-Type': 'application/json' },
    });

    let json = await res.json();
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
