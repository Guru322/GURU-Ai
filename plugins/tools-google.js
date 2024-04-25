import fetch from 'node-fetch'
import googleIt from 'google-it'

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `give a text to search Example: *${usedPrefix + command}* Guru bot`
  conn.gogleit = conn.gogleit ? conn.gogleit : {}
  await conn.reply(m.chat, wait, m)
  const result = await googleresult(text)
  const infoText = `✦ ──『 *GOOGLE SEARCH* 』── ⚝ \n\n [ ⭐ Reply the number of the desired search result to get the screenshot of the website]. \n\n`
  const orderedLinks = result.allLinks.map((linkk, index) => {
    const sectionNumber = index + 1
    const { title, link } = linkk
    return `*${sectionNumber}.* ${title}`
  })

  const orderedLinksText = orderedLinks.join('\n\n')
  const fullText = `${infoText}\n\n${orderedLinksText}`
  const { key } = await conn.reply(m.chat, fullText, m)
  conn.gogleit[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.gogleit[m.sender]
    }, 150 * 1000),
  }
}

handler.before = async (m, { conn }) => {
  conn.gogleit = conn.gogleit ? conn.gogleit : {}
  if (m.isBaileys || !(m.sender in conn.gogleit)) return
  const { result, key, timeout } = conn.gogleit[m.sender]
  console.log(conn.gogleit)
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const choice = m.text.trim()
  const inputNumber = Number(choice)
  if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
    const selectedUrl = result.allLinks[inputNumber - 1].url
    console.log('selectedUrl', selectedUrl)

    const response = await (
      await fetch(
        `https://api.apiflash.com/v1/urltoimage?access_key=7eea5c14db5041ecb528f68062a7ab5d&wait_until=page_loaded&url=${selectedUrl}`
      )
    ).buffer()

    await conn.sendFile(m.chat, response, 'google.jpg', 'Tada! Here is your result', m)
  } else {
    m.reply(
      'Invalid sequence number. Please select the appropriate number from the list above.\nBetween 1 to ' +
        result.allLinks.length
    )
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(google)$/i
handler.limit = true
export default handler

async function googleresult(query) {
  try {
    const res = await googleIt({ query })

    if (!res.length) return 'Sorry, no video results were found for this search.'

    const allLinks = res.map(video => ({
      title: video.title,
      url: video.link,
    }))

    return { allLinks }
  } catch (error) {
    return 'Error: ' + error.message
  }
}
