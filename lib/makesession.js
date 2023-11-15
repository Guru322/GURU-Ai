import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync, readFileSync } from 'fs';

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  let splitResult = txt.split('_GURU_');

 
  let sess1 = splitResult[0];
  let sess2 = splitResult[1];

  const url1 = `http://paste.c-net.org/${sess1}`;
  const url2 = `http://paste.c-net.org/${sess2}`

  try {

    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    if(!response1.ok) {
      throw new Error('Error fetching data: ' + response1.statusText);
    }

    
    const base64Data = await response1.text();
    const base64Data1 = await response2.text();

    const combinedData = `${base64Data.trim()}${base64Data1.trim()}`;

    const decodedData = Buffer.from(combinedData, 'base64').toString();

    const credentials = JSON.parse(decodedData);

    
    const credsPath = path.join(__dirname, '..', 'session', 'creds.json');
    writeFileSync(credsPath, JSON.stringify(credentials, null, 2));

    console.log('Credentials saved to creds.json');
  } catch (error) {
    console.error('Error retrieving or processing data:', error);
  }
}

export default processTxtAndSaveCredentials;
