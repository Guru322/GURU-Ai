import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ Example:\n${usedPrefix + command} https://www.tiktok.com/@username/video/1234567890123456789`
  
  if (!/https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com/i.test(args[0]))
    throw `❎ Please provide a valid TikTok URL`

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
      videoQuality: 'max',
      downloadMode: 'auto',
      tiktokFullAudio: true 
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
      
      if (data.audio) {
        await conn.sendFile(
          m.chat, 
          data.audio, 
          data.audioFilename || 'tiktok-audio.mp3', 
          '🎵 *TikTok Original Sound*', 
          m,
          false,
          { mimetype: 'audio/mp3' }
        )
      }
      
      for (let i = 0; i < data.picker.length; i++) {
        const item = data.picker[i]
        
        if (item.type === 'video') {
          await conn.sendFile(
            m.chat, 
            item.url, 
            `tiktok-video-${i+1}.mp4`, 
            `📹 *TikTok Video ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: 'video/mp4' }
          )
        } else if (item.type === 'photo' || item.type === 'gif') {
          const mimetype = item.type === 'gif' ? 'image/gif' : 'image/jpeg'
          const extension = item.type === 'gif' ? 'gif' : 'jpg'
          
          await conn.sendFile(
            m.chat, 
            item.url, 
            `tiktok-${item.type}-${i+1}.${extension}`, 
            `🖼️ *TikTok ${item.type} ${i + 1}/${data.picker.length}*`, 
            m,
            false,
            { mimetype: mimetype }
          )
        }
      }
    } 
    else if (data.status === 'redirect' || data.status === 'tunnel') {
      const mediaUrl = data.url
      const filename = data.filename || 'tiktok-video.mp4'
      
      await m.reply('📥 *Downloading TikTok video...*')
      
      const caption = `
      ≡ *GURU TIKTOK DL*
      
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
    console.error('TikTok download error:', error)
    m.react(error)
    m.reply(`❎ Error: ${error.message}`)
  }
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = ['tiktok', 'tt', 'tiktokdl', 'ttvid']
handler.desc = 'Download Tiiktok videos and audio. Reply with the TikTok URL.'

export default handler