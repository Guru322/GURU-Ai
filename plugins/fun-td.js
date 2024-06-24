import axios from 'axios';

let handler = async (m, { conn, command }) => {
  try {
    if (command === 'td') {
      const message = handler.help.join('\n');
      conn.sendMessage(m.chat, { text: message }, { quoted: m });
      return;
    }

    if (command.toLowerCase() === 'dare') {
      const dareQuestion = await fetchDareQuestion();
      const message = formatMessage(dareQuestion);
      conn.sendMessage(m.chat, { text: message }, { quoted: m });
      return;
    }

    const baseURL = 'https://api.truthordarebot.xyz/api/';

    // endpoint based on the command
    let endpoint;
    switch (command.toLowerCase()) {
      case 'truth':
        endpoint = 'truth';
        break;
      case 'wyr':
      case 'wouldyourather':
        endpoint = 'wyr';
        break;
      case 'nhie':
      case 'neverhaveiever':
        endpoint = 'nhie';
        break;
      case 'paranoia':
        endpoint = 'paranoia';
        break;
      default:
        throw new Error('Invalid command. Please specify one of: !truth, !dare, !wyr, !nhie, !paranoia');
    }

    const question = await fetchWithRetry(`${baseURL}${endpoint}`);
    const message = formatMessage(question);
    conn.sendMessage(m.chat, { text: message }, { quoted: m });

  } catch (error) {
    console.error('Error handling Truth or Dare command:', error);
    throw new Error('Failed to fetch Truth or Dare question. Please try again later.');
  }
};

const fetchDareQuestion = async () => {
  const dareURL = 'https://api.truthordarebot.xyz/api/dare';
  try {
    const response = await axios.get(dareURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching dare question:', error);
    throw new Error('Failed to fetch dare question. Please try again later.');
  }
};

const fetchWithRetry = async (url, maxRetries = 3) => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      retryCount++;
      console.error(`Attempt ${retryCount} failed: ${error.message}`);
      if (retryCount < maxRetries) {
        console.log(`Retrying (${retryCount}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
      } else {
        throw new Error(`Failed after ${retryCount} attempts: ${error.message}`);
      }
    }
  }
};

const formatMessage = (question) => {
  return `Type: ${question.type.toUpperCase()}\n${question.question}`;
};

handler.command = /^(truth|dare|wyr|wouldyourather|nhie|neverhaveiever|paranoia|td)$/i;
handler.group = true;
// td -> list of commands that is in handler.help
handler.help = [
  'truth - Get a random truth question.',
  'dare - Get a random dare question.',
  'wyr - Get a random Would You Rather question.',
  'nhie - Get a random Never Have I Ever question.',
  'paranoia - Get a random Paranoia question.',
  'td - List all available Truth or Dare commands.'
];

export default handler;

