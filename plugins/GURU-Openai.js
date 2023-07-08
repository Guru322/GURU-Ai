import fetch from 'node-fetch';
import { ChatGpt } from '../lib/scraper.js';
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Enter a request or an order to use ChatGpt*\n\n*Example*\n* ${usedPrefix + command} series 2022 Netflix*\n* ${usedPrefix + command} write a JS code*`;
    try {
      const systemMessage = 'Analyzing your request...';
      const response = await ChatGpt(text, systemMessage);
      m.reply(`${response.result}`.trim());
    } catch (error) {
      console.error(error);
      throw `*ERROR*`;
    }
  };

handler.command = ['bro', 'chatgpt', 'ai', 'siri'];
handler.diamond = false;

export default handler;
