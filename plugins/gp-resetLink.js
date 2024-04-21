
let handler = async (m, { conn }) => {
  let res = await conn.groupRevokeInvite(m.chat)
  m.reply('✅ Group link has been successfully reset\n\n📌 new link:\nhttps://chat.whatsapp.com/' + res)
}
handler.help = ['linkändern']
handler.tags = ['group']
handler.command = ['linkändern', 'resetlink', 'anularlink'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler
