import fetch from 'node-fetch'
import displayLoadingScreen from '../lib/loading.js'
let handler = async (m, { conn, text }) => {
  if (!text) {
    console.log('No song name provided.')
    throw `*Please enter a song name*`
  }
  m.react('🎶')
  //await displayLoadingScreen(conn, m.chat)
  let pp = 'https://wallpapercave.com/wp/wp7932387.jpg'
  const query = encodeURIComponent(text)
  let res = `https://api.guruapi.tech/spotifysearch?query=${query}`
  let spurl = await fetch(res)
  spurl = await spurl.json()
  let dlres = await fetch(`https://api.guruapi.tech/spotifydl?url=${spurl.data[0].url}`)
  dlres = await dlres.json()
  let sturl  = dlres.data.url

  let doc = {
    audio: {
      url: sturl,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'Guru.mp3',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '↺ |◁   II   ▷|   ♡',
        body: `Now playing: ${text}`,
        thumbnailUrl: dlres.data.thumbnail,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  }

  await conn.sendMessage(m.chat, doc, { quoted: m })
}
handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|song)$/i

export default handler
