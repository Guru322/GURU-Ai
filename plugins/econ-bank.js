let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let username = conn.getName(who)
    //let { wealth } = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `âœ³ï¸ The user is not found in my database`

    var wealth = 'BrokeðŸ˜­'
     if (`${user.bank}`           <= 3000){
            wealth = 'BrokeðŸ˜­'
      } else if (`${user.bank}`   <= 6000){
            wealth = 'PoorðŸ˜¢'
        } else if (`${user.bank}` <= 100000){
            wealth = 'AverageðŸ’¸'
        } else if (`${user.bank}` <= 1000000){
            wealth = 'RichðŸ’¸ðŸ’°'
        } else if (`${user.bank}` <= 10000000){
            wealth = 'MillionaireðŸ¤‘'
        } else if (`${user.bank}` <= 1000000000){
            wealth = 'Multi-MillionaireðŸ¤‘'
        } else if (`${user.bank}` <= 10000000000){
            wealth = 'BillionaireðŸ¤‘ðŸ¤‘'
        }    
    
    conn.reply(m.chat, `ðŸ¦ *Bank | ${username}*

*ðŸª™ Gold* : ${user.bank}

*Wealth :* ${wealth}

`, m, { mentions: [who] })  //${user.chicken}
}
handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'vault'] 
handler.register = true
export default handler