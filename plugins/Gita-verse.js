import fetch from 'node-fetch';

let gitaVerseHandler = async (m, { conn }) => {
  try {
    // Extract the verse number from the command text.
    let verseNumber = m.text.split(' ')[1];

    if (!verseNumber || isNaN(verseNumber)) {
      verseNumber = Math.floor(Math.random() * 700) + 1;
    }

    let res = await fetch(`https://gita-api.vercel.app/odi/verse/${verseNumber}`);

    if (!res.ok) {
      let error = await res.json(); 
      throw new Error(`API request failed with status ${res.status} and message ${error.detail[0].msg}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let gitaVerse = `
🕉 *Bhagavad Gita: Sacred Teachings*\n
📜 *Chapter ${json.chapter_no}: ${json.chapter_name}*\n
Verse ${json.verse_no}:\n
" ${json.verse} "\n
*🔮 Translation:*\n
${json.translation}\n
*🧘‍♂️ Spiritual Insight (Purport):*\n
${json.purport}`;

    m.reply(gitaVerse);

   
    if (json.audio_link) {
      conn.sendFile(m.chat, json.audio_link, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

gitaVerseHandler.help = ['gita [verse_number]'];
gitaVerseHandler.tags = ['religion'];
gitaVerseHandler.command = ['gita', 'verse']

export default gitaVerseHandler;

