import { writeFile } from 'fs/promises';
import { join } from 'path';


export default async function writeSessionToCreds(__dirname) {
  try {
    if (process.env.SESSION_ID) {
      const sessionBase64 = process.env.SESSION_ID;
      const sessionPath = join(__dirname, 'sessions', 'creds.json');

     
      const sessionJson = Buffer.from(sessionBase64, 'base64').toString('utf-8');

      
      const credsData = JSON.parse(sessionJson);

      await writeFile(sessionPath, JSON.stringify(credsData, null, 2));

      console.log('Session data written to creds.json');
    } else {
      console.log('SESSION_ID environment variable is not defined.');
    }
  } catch (error) {
    console.error('Error writing session data to creds.json:', error);
  }
}
