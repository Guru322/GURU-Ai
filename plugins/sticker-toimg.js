import moment from 'moment';

// Dummy-Daten für die Chats (kann durch echte Daten ersetzt werden)
let chats = [
  {
    id: 1,
    username: 'wa-user1',
    displayName: 'User 1',
    messages: [
      { time: '2024-07-10 14:00:00', sender: 'user', type: 'text', content: 'Hey, wie geht es dir?' },
      { time: '2024-07-10 14:15:00', sender: 'bot', type: 'text', content: 'Mir geht es gut, danke!' }
      // Weitere Nachrichten können hinzugefügt werden
    ]
  },
  {
    id: 2,
    username: 'wa-user2',
    displayName: 'User 2',
    messages: [
      { time: '2024-07-09 18:30:00', sender: 'user', type: 'text', content: 'Hallo!' },
      { time: '2024-07-09 18:35:00', sender: 'bot', type: 'text', content: 'Hallo, wie kann ich Ihnen helfen?' }
      // Weitere Nachrichten können hinzugefügt werden
    ]
  }
];

let handler = async (m, { conn, isOwner }) => {
  // Überprüfen, ob der Befehl vom Besitzer des Bots kommt
  if (!isOwner) {
    await conn.sendMessage(m.chat, { text: 'Nur der Bot-Besitzer kann diesen Befehl verwenden.' }, { quoted: m });
    return;
  }

  // Befehl /chatlist: Liste aller Chats anzeigen
  if (m.body === '/chatlist') {
    let response = 'Aktuelle Chat Liste:\n\n';

    chats.forEach(chat => {
      response += `Chat ${chat.id} mit ${chat.displayName}\n`;
    });

    await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    return;
  }

  // Befehl /chat <id>: Chat-Verlauf eines bestimmten Chats anzeigen
  if (m.body.startsWith('/chat ')) {
    let chatId = parseInt(m.body.split(' ')[1]);
    let selectedChat = chats.find(chat => chat.id === chatId);

    if (!selectedChat) {
      await conn.sendMessage(m.chat, { text: 'Chat nicht gefunden.' }, { quoted: m });
      return;
    }

    let chatHistory = '';
    selectedChat.messages.forEach(msg => {
      let sender = msg.sender === 'user' ? selectedChat.displayName : 'Bot';
      let messageType = msg.type === 'text' ? '' : ` (${msg.type})`;
      chatHistory += `${sender}\n${msg.content}${messageType}\n${moment(msg.time).format('YYYY-MM-DD HH:mm:ss')}\n\n`;
    });

    await conn.sendMessage(m.chat, { text: chatHistory }, { quoted: m });
  }
};

handler.help = ['/chatlist', '/chat <id>'];
handler.tags = ['main'];
handler.command = ['chatlist', 'chat'];

export default handler;