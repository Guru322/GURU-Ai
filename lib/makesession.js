import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import * as  mega from 'megajs'; 

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const megaCode = txt.replace('GuruAi~', '');
  const megaUrl = `https://mega.nz/file/${megaCode}`;
  console.log(megaUrl)

  const file = mega.File.fromURL(megaUrl);

  try {
    const stream = file.download();
    let data = '';
    
    for await (const chunk of stream) {
      data += chunk.toString();
    }

    const credsPath = path.join(__dirname, '..', 'session', 'creds.json');
    writeFileSync(credsPath, data); 
    console.log('Saved credentials to', credsPath);
  } catch (error) {
    console.error('Error downloading or saving credentials:', error);
  }
}

export default processTxtAndSaveCredentials;
