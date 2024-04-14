const delay = time => new Promise(res => setTimeout(res, time))

export async function before(m) {
  let bot = global.db.data.settings[this.user.jid] || {}
 
  if (m.isBaileys) return
  if (!bot.antiCall) return

  const messageType = {
    40: '📞 You missed a voice call, and the call has been missed.',
    41: '📹 You missed a video call, and the call has been missed.',
    45: '📞 You missed a group voice call, and the call has been missed.',
    46: '📹 You missed a group video call, and the call has been missed.',
  }[m.messageStubType]

  
  if (messageType) {
   

    await this.sendMessage(m.chat, {
      text: `You are banned + blocked for calling the bot`,
      mentions: [m.sender],
    })

   
    await delay(1000)

    global.db.data.users[m.sender].banned = true
    global.db.data.users[m.sender].warning = 1

   

    await this.updateBlockStatus(m.sender, 'block')

  
    if (m.isGroup) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
  } else {
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: m.messageStubType,
    })
  }
}

export const disabled = false
