import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

let quranSurahHandler = async (m, { conn }) => {
  try {
    // Extract the surah number or name from the command text.
    let surahInput = m.text.split(' ')[1];

    if (!surahInput) {
      throw new Error(`Please specify the surah number or name`);
    }

    let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran');
    let surahList = await surahListRes.json();

    let surahData = surahList.data.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      throw new Error(`Couldn't find surah with number or name "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    
    if (!res.ok) {
      let error = await res.json(); 
      throw new Error(`API request failed with status ${res.status} and message ${error.message}`);
    }

    let json = await res.json();

    // Translate tafsir from Bahasa Indonesia to Urdu
    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });

    // Translate tafsir from Bahasa Indonesia to English
    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true });

    let quranSurah = `
🕌 *Quran: The Holy Book*\n
📜 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
Type: ${json.data.type.en}\n
Number of verses: ${json.data.ayahCount}\n
🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}`;

    m.reply(quranSurah);

    if (json.data.recitation.full) {
      conn.sendFile(m.chat, json.data.recitation.full, 'recitation.mp3', null, m, true, { type: 'audioMessage', ptt: true });
    }
  } catch (error) {
    console.error(error);
    m.reply(`Error: ${error.message}`);
  }
};

quranSurahHandler.help = ['quran [surah_number|surah_name]'];
quranSurahHandler.tags = ['quran', 'surah'];
quranSurahHandler.command = ['quran', 'surah']

export default quranSurahHandler;

  
  
  
  
