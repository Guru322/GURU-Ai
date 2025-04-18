import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, usedPrefix }) => {
  if (!text) throw '✳️ What do you want to search for on YouTube?'
  
  m.react(rwait)

  try {
    // Note: Cobalt API doesn't have a built-in search function
    // We'll use a public YouTube search API instead
    const searchUrl = `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(text)}&type=video&limit=10`
    
    // Use RapidAPI's YouTube search (requires API key - replace with your own)
    // You can set RAPIDAPI_KEY in your environment variables
    const rapidApiKey = process.env.RAPIDAPI_KEY || 'your_rapidapi_key'
    
    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    })
    
    const searchData = await searchResponse.json()
    
    if (!searchData.contents || !searchData.contents.length) {
      throw new Error('No search results found')
    }
    
    // Format search results
    const videos = searchData.contents.filter(item => item.type === 'video')
    if (!videos.length) throw '❎ No videos found with that search'

    // Build the result message
    let resultText = videos.map((v, i) => {
      const video = v.video
      return `
*${i + 1}.* ${video.title}
▢ *Link:* https://www.youtube.com/watch?v=${video.videoId}
▢ *Duration:* ${video.lengthText || 'N/A'}
▢ *Published:* ${video.publishedTimeText || 'N/A'}
▢ *Views:* ${video.viewCountText || 'N/A'}
      `.trim()
    }).join('\n\n')
    
    const searchResultText = `
🔍 *YouTube Search Results*
 
${resultText}
    
🔗 *Download:*
${usedPrefix}yta <url> - Download audio
${usedPrefix}ytv <url> [quality] - Download video`.trim()
    
    m.reply(searchResultText)
    m.react(done)
  } catch (error) {
    console.error('Error in YouTube search:', error)
    await m.reply(`❎ Error: ${error.message}`)
    m.react(error)
  }
}

handler.help = ['ytsearch']
handler.tags = ['downloader']
handler.command = ['yts', 'ytsearch']

export default handler
