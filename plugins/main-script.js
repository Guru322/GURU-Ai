import { promises } from 'fs';
import { join } from 'path';
import axios from 'axios';

let handler = async function (m, { conn, __dirname }) {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({})));

    let repoUrl = _package.repository && _package.repository.url ? _package.repository.url : null;

    if (repoUrl) {
      let match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(\.git)?$/);
      if (match) {
        let owner = match[1];
        let repoName = match[2];

        try {
          let response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`);
          let repoData = response.data;

          let replyMessage = `
*≡ REPOSITORY DETAILS *

📚 Repository: ${repoData.full_name}
📄 Description: ${repoData.description || 'No description available'}
🌟 Stars: ${repoData.stargazers_count}
🍴 Forks: ${repoData.forks_count}
🔗 URL: ${repoData.html_url}
🕒 Created: ${new Date(repoData.created_at).toDateString()}
🛠 Language: ${repoData.language || 'Unknown'}
`.trim();

          // Prepare the message object
          let messageObject = {
            requestPaymentMessage: {
              currencyCodeIso4217: 'INR',
              amount1000: '6900000000',
              requestFrom: '0@s.whatsapp.net',
              noteMessage: {
                extendedTextMessage: {
                  text: replyMessage,
                  contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                      showAdAttribution: true
                    }
                  }
                }
              }
            }
          };

          await conn.relayMessage(m.chat, messageObject, {});
        } catch (error) {
          console.error('Error fetching repository data:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading package.json:', error);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'git', 'script'];

export default handler;

