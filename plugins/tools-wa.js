let handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) throw `Please provide a phone number\n\n📌 Example: *${usedPrefix + command}* 1234567890`;

  const waLink = `https://wa.me/${text}`;
  const message = `*WhatsApp Link:*\n${waLink}`;

  conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } });

  m.react('✅');
};

handler.help = ['wa'];
handler.tags = ['tools'];
handler.command = ['wa'];

export default handler;


