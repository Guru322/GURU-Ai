import axios from 'axios';

let handler = async function (m, { conn }) {
  try {
    const funFacts = `
🤖 *Silver Fox Robot Fun Facts* 🦊

🎉 *Exciting Mission:* Making your WhatsApp experience awesome!

🤖 *Special Feature:* I can do anything possible on WhatsApp. From fun to functional!

🤣 *Note:* Don't call me, don't spam, and keep it fun! 😄
    `.trim();

    await conn.reply(m.chat, funFacts, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'An error occurred while fetching fun facts. My circuits are feeling a bit rusty!', m);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'script'];

export default handler;
