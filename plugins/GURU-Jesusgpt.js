import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;

    // Check if the quoted message has a quoted message
    if (m.quoted.quotedMsgObj) {
      const quotedQuotedText = m.quoted.quotedMsgObj.text;
      if (quotedQuotedText) {
        text = `${text} ${quotedQuotedText}`;
      }
    }
  } else if (text && m.quoted && m.quoted.text) {
    text = `${text} ${m.quoted.text}`;
    if (m.quoted.text.includes('.jesus')) {
      text = text.replace('.jesus', ''); // Remove ".jesus" from the quoted message if detected
    }
  }

  try {
    const response = await fetch(`https://guru-gpt4-prod-gpt4-reverse-o8hyfh.mo1.mogenius.io/api/jesusgpt?query=${encodeURIComponent(text)}`);
    const data = await response.json();
    const { response: result } = data;
    m.reply(result.trim());
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.command = ['jesus','jesusgpt'];
handler.diamond = false;

export default handler;
