// filepath: /workspaces/GURU-Ai/plugins/dl-facebook.js
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ Example:\n${usedPrefix + command} https://www.facebook.com/watch?v=123456789`
  
  if (!/https?:\/\/(www\.|web\.|m\.)?facebook\.com/i.test(args[0]))
    throw `❎ Please provide a valid Facebook URL`

  m.react(rwait)
  
  try {
    const apiUrl = `https://api.mobahub.com/`
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
    if (process.env.COBALT_API_KEY) {
      headers['Authorization'] = `Api-Key ${process.env.COBALT_API_KEY}`
    }
    
    const requestBody = {
      url: args[0],
      filenameStyle: 'pretty',
      videoQuality: 'max', // Get highest quality available
      downloadMode: 'auto'
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    })
    
    const data = await response.json()
    
    if (data.status === 'error') {
      throw new Error(`API error: ${data.error.code}`)
    }
    
    if (data.status === 'picker') {
      await m.reply(`✅ *Found ${data.picker.length} media items!*\n\n📤 *Downloading now...*`)
      
      for (let i = 0; i < data.picker.length; i++) {
        const item = data.picker[i]
        const isVideo = item.type === 'video'
        
        if (isVideo) {
          await conn.sendFile(
            m.chat, 
            item.url, 
            `facebook-video-${i+1}.mp4`, 
            `📹 *Facebook Video ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: 'video/mp4' }
          )
        } else if (item.type === 'photo') {
          await conn.sendFile(
            m.chat, 
            item.url, 
            `facebook-photo-${i+1}.jpg`, 
            `🖼️ *Facebook Photo ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: 'image/jpeg' }
          )
        }
      }
    } 
    else if (data.status === 'redirect' || data.status === 'tunnel') {
      const mediaUrl = data.url
      const filename = data.filename || 'facebook-video.mp4'
      
      await m.reply('📥 *Downloading Facebook media...*')
      
      const caption = `
      ≡ *GURU FB DOWNLOADER*
      
      ▢ *Filename:* ${filename}
      `
      
      await conn.sendFile(
        m.chat, 
        mediaUrl, 
        filename, 
        caption, 
        m, 
        false, 
        { mimetype: filename.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg' }
      )
    } else {
      throw new Error(`Unexpected response status: ${data.status}`)
    }

    m.react(done)
  } catch (error) {
    console.error('Facebook download error:', error)
    m.react(error)
    m.reply(`❎ Error: ${error.message}`)
  }
}

handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = ['fb', 'fbdl', 'facebook', 'fbvid']
handler.desc = 'Download Facebook videos/photos using a URL'

export default handler