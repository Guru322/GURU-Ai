let handler = async (m, { text, conn, usedPrefix, command }) => {
    let why = `*ERROR, EXAMPLE:*\n*—◉ ${usedPrefix + command} @${m.sender.split("@")[0]}*`
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!who) conn.reply(m.chat, why, m, { mentions: [m.sender] })
    let res = [];
    switch (command) {
      case "block":
      case "unblock":
        if (who) await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
        else conn.reply(m.chat, why, m, { mentions: [m.sender] })
        break;
      case "unblock":
      case "unblock":
        if (who) await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
        else conn.reply(m.chat, why, m, { mentions: [m.sender] })
        break;
    }
    if (res[0]) conn.reply(m.chat, `*SUCCESS! USER ${command} ACTION PERFORMED ON ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}*`, m, { mentions: res })
  }
  
  handler.command = /^(block|unblock)$/i
  handler.rowner = true
  export default handler
  