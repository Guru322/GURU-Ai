import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `You need to give the URL of Any x(twitter) video, post, reel, image`
  m.reply(wait)

  let res
  try {
    res = await fetch(`https://api.guruapi.tech/xdown?url=${text}`)
  } catch (error) {
    throw `An error occurred: ${error.message}`
  }

  let api_response = await res.json()

  if (!api_response || !api_response.media) {
    throw `No video or image found or Invalid response from API.`
  }

  const mediaArray = api_response.media

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type
    const mediaURL = mediaData.url

    let cap = `HERE IS THE ${mediaType.toUpperCase()} >,<`

    if (mediaType === 'video') {
      conn.sendFile(m.chat, mediaURL, 'x.mp4', cap, m)
    } else if (mediaType === 'image') {
      conn.sendFile(m.chat, mediaURL, 'x.jpg', cap, m)
    }
  }
}

handler.help = ['Twitter']
handler.tags = ['downloader']
handler.command = /^(twitter|xdl)$/i

export default handler

