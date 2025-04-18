import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ Example:\n${usedPrefix + command} https://www.instagram.com/p/ABC123/`
  
  // Check for valid Instagram URL patterns
  if (!/https?:\/\/(www\.)?instagram\.(com|stories)\/([^/?#&]+)/i.test(args[0]))
    throw `❎ Please provide a valid Instagram URL`

  
  try {
    const apiUrl = `https://api.mobahub.com/`
    
    // Setup request headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
    // Add authorization if you have an API key
    if (process.env.COBALT_API_KEY) {
      headers['Authorization'] = `Api-Key ${process.env.COBALT_API_KEY}`
    }
    
    // Setup request body according to Cobalt API docs
    const requestBody = {
      url: args[0],
      filenameStyle: 'pretty',
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
    
    // Handle picker response (multiple media)
    if (data.status === 'picker') {
      await m.reply(`✅ *Found ${data.picker.length} media items!*\n\n📤 *Downloading now...*`)
      
      // Download audio first if available
      if (data.audio) {
        await conn.sendFile(
          m.chat, 
          data.audio, 
          data.audioFilename || 'instagram-audio.mp3', 
          '🎵 *Instagram Audio*', 
          m,
          false,
          { mimetype: 'audio/mp3' }
        )
      }
      
      // Download each media item
      for (let i = 0; i < data.picker.length; i++) {
        const item = data.picker[i]
        const isVideo = item.type === 'video'
        
        if (isVideo) {
          await conn.sendFile(
            m.chat, 
            item.url, 
            `instagram-video-${i+1}.mp4`,
            `📹 *Instagram ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: 'video/mp4' }
          )
        } else {
          await conn.sendFile(
            m.chat, 
            item.url, 
            `instagram-photo-${i+1}.jpg`, 
            `🖼️ *Instagram ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: 'image/jpeg' }
          )
        }
      }
    } 
    // Handle redirect/tunnel response (single media)
    else if (data.status === 'redirect' || data.status === 'tunnel') {
      const mediaUrl = data.url
      const filename = data.filename || 'instagram-media'
      
      // Determine if it's video based on filename
      const isVideo = filename.endsWith('.mp4')
      
      if (isVideo) {
        await conn.sendFile(
          m.chat, 
          mediaUrl, 
          filename, 
          `📹 *Instagram Video*`, 
          m,
          false,
          { mimetype: 'video/mp4' }
        )
      } else {
        await conn.sendFile(
          m.chat, 
          mediaUrl, 
          filename, 
          `🖼️ *Instagram Image*`, 
          m,
          false,
          { mimetype: 'image/jpeg' }
        )
      }
    } else {
      throw new Error(`Unexpected response status: ${data.status}`)
    }

  } catch (error) {
    console.error('Instagram download error:', error)
    m.reply(`❎ Error: ${error.message}`)
  }
}

handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = ['ig', 'igdl', 'instagram', 'igimg', 'igvid']

export default handler