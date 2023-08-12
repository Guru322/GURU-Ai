import fetch from 'node-fetch'

let gitagptHandler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response. Keep in mind that GitaGPT is still in testing phase, so it may generate inaccurate responses at times.`
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text
  }

  try {
    const response = await fetch(`https://guru-gpt4-prod-gpt4-reverse-o8hyfh.mo1.mogenius.io/api/gitagpt?query=${encodeURIComponent(text)}`)
    const data = await response.json()
    const { response: result } = data
    m.reply(result.trim())
  } catch (error) {
    console.error('Error:', error)
    throw `*ERROR*`
  }
}

gitagptHandler.command = ['gitagpt']
gitagptHandler.diamond = false

export default gitagptHandler
