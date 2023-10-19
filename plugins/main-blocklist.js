let handler = async (m, { conn }) => {
  if (m.sender !== global.owner && m.sender !== conn.user.jid) {
    throw '❌ This command can only be used by our robotic central.'
  }

  await conn.fetchBlocklist().then(async data => {
    let txt = `*≡ Blocklist *\n\n*Total :* ${data.length}\n\n┌─⊷\n`
    for (let i of data) {
      txt += `▢ @${i.split("@")[0]}\n`
    }
    txt += "└───────────"
    return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
  }).catch(err => {
    console.log(err);
    throw '❌ No numbers are blocked.'
  })
}

handler.help = ['blocklist']
handler.tags = ['main']
handler.command = ['blocklist', 'listblock'] 

export default handler
