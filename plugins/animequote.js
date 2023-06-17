import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://some-random-api.com/animu/quote');
    if (!res.ok) throw await res.text();
    const json = await res.json();
    const { sentence, character, anime } = json;

    const message = `❖𝙌𝙐𝙊𝙏𝙀 ${sentence}\n\n❖𝘾𝙃𝘼𝙍𝘼𝘾𝙏𝙀𝙍 ${character}\n❖𝘼𝙉𝙄𝙈𝙀 ${anime}`;
    conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m });
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['animequote'];
handler.tags = ['internet'];
handler.command = /^(animequote)$/i;

export default handler;



