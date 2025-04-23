import fetch from 'node-fetch'
import ytSearch from 'yt-search'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline)
const tmpDir = os.tmpdir()

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
    const safeTitle = songTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').substring(0, 100)
    
    try {
      await conn.reply(m.chat, `⏳ *Downloading* "${songTitle}", please wait...`, m)
      
      const apiUrl = `https://ironman.koyeb.app/ironman/dl/yta?url=${encodeURIComponent(selectedUrl)}`
      
      const filePath = `${tmpDir}/${safeTitle}.mp3`
      
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error(`API responded with status: ${response.status}`)
      
      const fileStream = fs.createWriteStream(filePath)
      await streamPipeline(response.body, fileStream)
      
      await conn.reply(m.chat, `✅ *Download complete!* Sending the audio now...`, m)
      
      const doc = {
        audio: {
          url: filePath,
        },
        mimetype: 'audio/mpeg',
        ptt: false,
        waveform: [100, 0, 0, 0, 0, 0, 100],
        fileName: `${safeTitle}.mp3`,
      }
      
      await conn.sendMessage(m.chat, doc, { quoted: m })
      
      setTimeout(() => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log(`Deleted temp file: ${filePath}`)
          }
        } catch (cleanupErr) {
          console.error('Error during file cleanup:', cleanupErr)
        }
      }, 5000)
      
    } catch (error) {
      console.error('Download error:', error)
      conn.reply(m.chat, `❌ Error downloading audio: ${error.message}. Please try again later.`, m)
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
handler.desc = 'Search and download music from YouTube. Reply with the number of the desired search result.'
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