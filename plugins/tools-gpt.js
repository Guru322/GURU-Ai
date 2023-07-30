import fetch from "node-fetch";
import { generateWAMessageFromContent } from "@adiwajshing/baileys";
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    let userQuery = text; // Start with the user's message

    if (m.quoted && m.quoted.text) {
      let quotedMsg = m.quoted.text;

      // Remove ".ai" from the quoted message if detected
      if (quotedMsg.includes('.ai')) {
        quotedMsg = quotedMsg.replace('.ai', '');
      }

      if (userQuery) {
        userQuery += ` ${quotedMsg}`; // Concatenate the sanitized quoted message with the user's message
      } else {
        userQuery = quotedMsg; // If userQuery is empty, use only the quoted message
      }
    }

    if (!userQuery) {
      throw new Error(`Chatgpt .\n\nuse:\n${usedPrefix}${command} Hello?`);
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userQuery }],
    });

    if (response.data.choices && response.data.choices.length > 0) {
      const reply = response.data.choices[0].message.content;
      conn.reply(m.chat, reply, m);
    } else {
      throw new Error("Empty response from OpenAI");
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Error response:", error.response);
    conn.reply(m.chat, "An error occurred. Please try again later.", m);
  }
}

handler.command = /^(openai|gpt)$/i;
handler.help = ["gpt", "openai"].map(v => v + " <texts>");
handler.tags = ["internet"];

export default handler;
