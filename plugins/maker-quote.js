import fetch from 'node-fetch'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'
import uploadFile from "../lib/uploadFile.js";
import fs from 'fs'
import os from 'os'
import path from 'path'

let handler = async (m, { conn, text }) => {
  try {
    if (!text && !(m.quoted && m.quoted.text)) {
      throw `Please provide some text or quote a message to get a response.`
    }
    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text
    }
    const logo = 'https://avatars.githubusercontent.com/u/106463398?v=4'
    const q = m.quoted || m;
    const match = q?.mimetype?.match(/^(image|video|webp)\//);
    const mediaUrl = match ? await uploadFile(await q?.download()) : logo;
    const senderId = parseInt(m.sender.split("@")[0]);
    const senderName = m.name || await conn.getName(m.sender);
    const senderPhotoUrl = await conn.profilePictureUrl(m.sender, "image").catch(() => logo);
    const replyMessage = q !== m ? {
      entities: [],
      avatar: true,
      id: parseInt(q.sender.split("@")[0]),
      name: q.name || await conn.getName(q.sender),
      photo: {
        url: await conn.profilePictureUrl(q.sender, "image").catch(() => logo)
      },
      text: q.text || q.caption || q.description || q.message?.documentMessage?.caption || ""
    } : null;
    const messageText = text || q?.text || q?.caption || q?.description || q?.message?.documentMessage?.caption || m.text || m.caption || m.message?.documentMessage?.caption || "";

    m.react(rwait)
    const url = 'https://api.guruapi.tech/qc';
    const data = {
  mediaUrl: mediaUrl,
  senderId: senderId,
  senderName: senderName,
  senderPhotoUrl: senderPhotoUrl,
  messageText: messageText,
  replyMessage: replyMessage || null
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};
let res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
    }

    let json = await res.json()

    if (!json || !json.image) {
      throw new Error('Unexpected response structure')
    }
    function randomId() {
      return Math.floor(100000 + Math.random() * 900000)
    }

    let bufferImage = Buffer.from(json.image, 'base64')

    let tempImagePath = path.join(os.tmpdir(), 'tempImage.png')
    fs.writeFileSync(tempImagePath, bufferImage)
    let sticker = new Sticker(tempImagePath, {
      pack: global.packname,
      author: senderName,
      type: StickerTypes.FULL,
      categories: ['🤩', '🎉'],
      id: randomId(),
      quality: 100,
      background: '#00000000',
    })

    try {
      await conn.sendMessage(m.chat, await sticker.toMessage(), { quoted: m })
    } catch (stickerError) {
      console.error('Error sending sticker:', stickerError)
      m.reply('Error sending sticker. Sending image instead.')

      await conn.sendFile(m.chat, tempImagePath, 'quote.png', 'Here is the quote image:', m)
    }

    fs.unlinkSync(tempImagePath)

    m.react('🤡')
  } catch (e) {
    console.error(e)
    m.react('😭')
  }
}

handler.help = ['quote']
handler.tags = ['fun']
handler.command = ['quote']

export default handler
