const xpperlimit = 2
let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^tomoney/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].money += count
    conn.reply(m.chat, `sucess converted ${count} Exp ✨ to money`, m)
  } else conn.reply(m.chat, `[❗] Your Exp is not enough to exchange for ${count} ✨`, m)
}
handler.help = ['tomoney <amount>']
handler.tags = ['xp']
handler.command = /^tomoney([0-9]+)|tomoney|tomoneyall$/i

export default handler
