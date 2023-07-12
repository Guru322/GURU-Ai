import fetch from 'node-fetch';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'hi';


export async function before(m, { conn }) {
  if (m.isBaileys && m.fromMe) {
    return true;
  }

  if (!m.isGroup) {
    return false;
  }

  let chat = global.db.data.chats[m.chat]

  if (!chat.jarvis) {
    return true;
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `text=${encodeURIComponent(m.text)}&lc=en&key=`
  }

  const res = await fetch('https://api.simsimi.vn/v1/simtalk', options);
  const json = await res.json();

  let reply;
  if (json.status === '200') {
    reply = json.message;
  } else {
    throw 'Invalid response from SimSimi.';
  }

  let speech;
  try { 
    speech = await tts(reply, defaultLang);
  } catch (e) {
    m.reply(e + '');
    throw 'Error occurred during text-to-speech conversion.';
  } finally {
    if (speech) conn.sendFile(m.chat, speech, 'tts.opus', null, m, true);
  }
}

function tts(text, lang = 'en') {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) { reject(e); }
  });
}
