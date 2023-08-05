//thanks to inrl:https://github.com/inrl-official
import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const response = await fetch('https://inrl-web.onrender.com/api/getmail?apikey=inrl');
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const tempMails = data.result.join('\n');
        const replyMessage = `*Temporary Email Addresses:*\n\n${tempMails}\n\n use \`\`\`\.checkmail <mail-address>\`\`\`\ if you want to check inbox of any temp mail used from above`;
        m.reply(replyMessage);
      } else {
        m.reply('No temporary email addresses found.');
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply('Failed to fetch temporary email addresses.');
    }
  } else if (command === 'checkmail') {
    if (!text && !(m.quoted && m.quoted.text)) {
      m.reply('Please provide some text or quote a message to get a response.');
      return;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`;
    }

    try {
      const response = await fetch(`https://inrl-web.onrender.com/api/getmailinfo?email=${encodeURIComponent(text)}&apikey=inrl`);
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const messages = data.result.map((message) => {
          return `
*From:* ${message.from}
*Subject:* ${message.subject}
*Date:* ${message.date}
*Body:*
${message.text}
          `;
        }).join('\n\n---\n\n');
        const replyMessage = `*Messages in* ${text}:\n\n${messages}`;
        m.reply(replyMessage);
      } else {
        m.reply(`No messages found in ${text}.`);
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply(`Failed to check messages in ${text}.`);
    }
  }
};

handler.command = ['tempmail', 'checkmail'];
handler.diamond = false;

export default handler;
