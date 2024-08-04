import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw 'uhm.. what do you want to say?';
    await m.react('🤖');

    const prompt = encodeURIComponent(text);
    let userid = conn.getName(m.sender) || "default"
    let apiurl = `https://api.guruapi.tech/ai/gpt4?username=${userid}&query=hii${prompt}`;

    const result = await fetch(apiurl);
    const response = await result.json();
    
    if (!response.msg) throw 'No result found';

    const replyText = response.msg;
    await conn.sendButton(
      m.chat, 
      replyText, 
      author, 
      'https://telegra.ph/file/c3f9e4124de1f31c1c6ae.jpg', 
      [['Script', `.sc`]], 
      null, 
      [['Follow Me', `https://github.com/Guru322`]], 
      m
    );
  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. We are trying hard to fix it ASAP.');
  }
};

handler.help = ['gpt4 <text>'];
handler.tags = ['tools'];
handler.command = /^(gpt4)$/i;

export default handler;

