import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import { BufferJSON } from '@whiskeysockets/baileys';

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  let decodedData;

  const isBase64 = /^[a-zA-Z0-9+/]+={0,2}$/.test(txt);

  if (isBase64) {
    decodedData = Buffer.from(txt, 'base64').toString('utf-8');
  } else {
    const url = `https://pastebin.guruapi.tech/pastes?action=getpaste&id=${txt}`;

    try {
      const response = await axios.get(url);

      const base64Data = response.data.content;

      decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Error retrieving or processing data:', error);
      return;
    }
  }

  try {
    const credentials = JSON.parse(decodedData, BufferJSON.reviver);
    const credsPath = path.join(__dirname, '..', 'session', 'creds.json');
    writeFileSync(credsPath, JSON.stringify(credentials, BufferJSON.replacer, 2));
    console.log('Credentials saved to creds.json');
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
}

export default processTxtAndSaveCredentials;
