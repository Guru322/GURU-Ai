import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a word to search for.';

  const url = `https://some-random-api.com/dictionary?word=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw `An error occurred: ${json.message}`;
  }

  if (!json.word) {
    throw 'Word not found in the dictionary.';
  }

  const definition = json.definition;
  const example = json.example ? `*Example:* ${json.example}` : '';

  const message = `*Word:* ${json.word}\n*Definition:* ${definition}\n${example}`;
  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m });
};

handler.help = ['define <word>'];
handler.tags = ['tools'];
handler.command = /^define/i;

export default handler;
