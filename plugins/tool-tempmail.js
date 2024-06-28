import { TempMail } from 'tempmail.lol';

const tempmail = new TempMail();

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const inbox = await tempmail.createInbox();
      const emailMessage = `*Temporary Email Address:*\n\n${inbox.address}\n\nA token for checking this inbox will be sent in the next message. Use it with the .checkmail command.`;
      await m.reply(emailMessage);
      
      // Send the token as a separate, individual message
      await m.reply(inbox.token);

      // Send instructions as a third message
      await m.reply('Long press and copy the token above to use with the .checkmail command.');

    } catch (error) {
      console.error('Error:', error);
      m.reply('Failed to create a temporary email address.');
    }
  } else if (command === 'checkmail') {
    if (!text) {
      m.reply('Please provide the token of the temporary email you want to check.');
      return;
    }

    try {
      const emails = await tempmail.checkInbox(text);
      if (!emails) {
        m.reply(`No messages found or the inbox has expired.`);
        return;
      }

      if (emails.length === 0) {
        m.reply(`No messages found in the inbox.`);
        return;
      }

      const messages = emails.map(email => {
        return `
*From:* ${email.from}
*Subject:* ${email.subject}
*Date:* ${new Date(email.date).toLocaleString()}
*Body:*
${email.body}
        `;
      }).join('\n\n---\n\n');

      const replyMessage = `*Messages in inbox:*\n\n${messages}`;
      m.reply(replyMessage);
    } catch (error) {
      console.error('Error:', error);
      m.reply(`Failed to check messages.`);
    }
  }
};

handler.help = ['tempmail', 'checkmail <token>'];
handler.tags = ['tools'];
handler.command = ['tempmail', 'checkmail'];
handler.diamond = false;

export default handler;