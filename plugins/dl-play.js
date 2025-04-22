import fetch from 'node-fetch'
import ytSearch from 'yt-search'

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `give a text to search Example: *${usedPrefix + command}* sefali odia song`
  conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {}
  await conn.reply(m.chat, '⏳ *Searching...* Please wait while I find your music.', m)
  const result = await searchAndDownloadMusic(text)
  const infoText = `✦ ──『 *GURU PLAYER* 』── ⚝ \n\n [ ⭐ Reply the number of the desired search result to get the Audio]. \n\n`

  const orderedLinks = result.allLinks.map((link, index) => {
    const sectionNumber = index + 1
    const { title, url } = link
    return `*${sectionNumber}.* ${title}`
  })

  const orderedLinksText = orderedLinks.join('\n\n')
  const fullText = `${infoText}\n\n${orderedLinksText}`
  const { key } = await conn.reply(m.chat, fullText, m)
  conn.GURUPLAY[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.GURUPLAY[m.sender]
    }, 150 * 1000),
  }
}

handler.before = async (m, { conn }) => {
  conn.GURUPLAY = conn.GURUPLAY || {}
  if (m.isBaileys || !(m.sender in conn.GURUPLAY)) return
  const { result, key, timeout } = conn.GURUPLAY[m.sender]
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const inputNumber = Number(m.text.trim())
  if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
    clearTimeout(timeout)
    
    const { url: selectedUrl, title: songTitle } = result.allLinks[inputNumber - 1]
    const fileName = generateRandomName()
    await conn.reply(m.chat, `Sending the song (${songTitle}), please wait`, m)
    const streamUrl = `https://ironman.koyeb.app/ironman/dl/yta?url=${encodeURIComponent(selectedUrl)}`
    
    try {
      const doc = {
        audio: {
          url: streamUrl,
        },
        mimetype: 'audio/mpeg',
        ptt: false,
        waveform: [100, 0, 0, 0, 0, 0, 100],
        fileName: `${fileName}`,
      }

      await conn.sendMessage(m.chat, doc, { quoted: m })
    } catch (error) {
      conn.reply(m.chat, `Error sending audio: ${error.message}. Please try again later.`, m)
    } finally {
      delete conn.GURUPLAY[m.sender]
    }

  } else {
    m.reply('Invalid sequence number. Please select a number between 1 and ' + result.allLinks.length)
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play)$/i
handler.limit = true
export default handler

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

async function searchAndDownloadMusic(query) {
  const { videos } = await ytSearch(query)
  if (!videos || !videos.length) throw 'Sorry, no video results were found for this search.'
  const allLinks = videos.map(video => ({ title: video.title, url: video.url }))
  return { allLinks }
}

function generateRandomName() {
  const adjectives = [
    'happy',
    'sad',
    'funny',
    'brave',
    'clever',
    'kind',
    'silly',
    'wise',
    'gentle',
    'bold',
  ]
  const nouns = ['cat', 'dog', 'bird', 'tree', 'river', 'mountain', 'sun', 'moon', 'star', 'cloud']

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return randomAdjective + '-' + randomNoun
}