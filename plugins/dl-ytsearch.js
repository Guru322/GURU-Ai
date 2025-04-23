import ytSearch from 'yt-search'
import { format } from 'util'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Please provide a search term\n\nExample: *${usedPrefix}${command}* Guru tutorial`
  
  m.react('🔍')
  await conn.reply(m.chat, '🔎 *Searching YouTube...*', m)
  
  try {
    const results = await ytSearch(text)
    
    if (!results.videos.length) {
      return conn.reply(m.chat, `❌ No results found for *${text}*`, m)
    }
    
    const videos = results.videos.slice(0, 6)
    
    const carouselData = await Promise.all(videos.map(async (video) => {
      const thumbnail = video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
      
      const views = formatViews(video.views)
      
      const title = `${video.title}`
      const footer = `👁️ ${views} • ⏱️ ${video.timestamp} • 📅 ${video.ago}\n📢 ${video.author.name}`
      
      const buttons = []
      
      const urls = [
        [`📺 Watch on YouTube`, video.url]
      ]
      
      const copyText = [
        [`📋 Copy URL`, video.url]
      ]
      
      return [title, footer, thumbnail, buttons, copyText, urls]
    }))
    
    await conn.sendCarousel(
      m.chat, 
      carouselData,
      m, 
      {
        wm: global.packname || 'GURU-Ai',
        author: global.author || 'ᴳᵘʳᵘ ˢᵉⁿˢᵉⁱ',
        botdate: new Date().toLocaleDateString()
      }
    )
    
    m.react('✅')
  } catch (error) {
    console.error(error)
    m.react('❌')
    return conn.reply(m.chat, `❌ Error while searching: ${error.message}`, m)
  }
}

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M'
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K'
  } else {
    return views.toString()
  }
}

handler.help = ['ytsearch <query>']
handler.tags = ['downloader']
handler.command = /^(yts|ytsearch|youtubesearch)$/i
handler.desc = 'Search YouTube videos and download them. Reply with the number of the desired search result.'
handler.limit = true

export default handler