import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a word to search for.';

  const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw `An error occurred: ${json.message}`;
  }

  if (!json.list.length) {
    throw 'Word not found in the dictionary.';
  }

  const firstEntry = json.list[0];
  const definition = firstEntry.definition;
  const example = firstEntry.example ? `*Example:* ${firstEntry.example}` : '';

  const message = `*Word:* ${text}\n*Definition:* ${definition}\n${example}`;
  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m });
};

handler.help = ['define <word>'];
handler.tags = ['tools'];
handler.command = /^define/i;

export default handler;
