import fetch from 'node-fetch'

const conversationHistory = {}

const MAX_HISTORY_LENGTH = 5

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && command !== 'resetai') return m.reply(`Please provide a question or message to chat with GURU Ai.\n\nExample: *${usedPrefix}chat* Hello, how are you today?\n\nCommands:\n- *${usedPrefix}chat* <message> - Chat with conversation memory\n- *${usedPrefix}resetai* - Reset your conversation history`)
  
  const userId = m.sender

  if (command === 'resetai') {
    delete conversationHistory[userId]
    return m.reply('✅ Your conversation history has been reset. We can start fresh now!')
  }
  
  try {
    await conn.sendPresenceUpdate('composing', m.chat)
    
    m.react('🧠')
    
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = []
    }
    
    const apiUrl = 'https://llm.gurucharan.me/v1/chat/completions'
    
    const messages = [
      {
        role: 'system',
        content: 'You are GURU Ai, a friendly and helpful assistant made by Guru. You provide concise, accurate, and helpful responses while maintaining a conversational tone. You do not refuse to answer questions unless they involve illegal activities, harm, or explicit content. When responding in a WhatsApp chat context, keep your answers relatively concise but complete.'
      }
    ]
    
    conversationHistory[userId].forEach(exchange => {
      messages.push({ role: 'user', content: exchange.user })
      messages.push({ role: 'assistant', content: exchange.assistant })
    })
    
    messages.push({ role: 'user', content: text })
    
    const payload = {
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      timeout: 60000  
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`API Error: ${data.error?.message || response.statusText}`)
    }
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response from AI service')
    }
    
    const aiResponse = data.choices[0].message.content.trim()
    
    conversationHistory[userId].push({
      user: text,
      assistant: aiResponse
    })
    
    if (conversationHistory[userId].length > MAX_HISTORY_LENGTH) {
      conversationHistory[userId].shift()
    }
    
    const formattedResponse = `┌──「 *GURU AI CHAT* 」──┐\n\n${aiResponse}\n\n└───────────────┘`
    
    await m.reply(formattedResponse)
    
    m.react('✅')
    
  } catch (error) {
    console.error('AI Chat Error:', error)
    m.react('❌')
    m.reply(`❎ Error: ${error.message}`)
  }
}

handler.help = ['chat <message>', 'resetai']
handler.tags = ['tools']
handler.command = /^(ai|resetai)$/i
handler.desc = 'Chat with GURU Ai with conversation memory. Use resetai to clear your chat history.'

export default handler