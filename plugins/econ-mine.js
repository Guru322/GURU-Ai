//import db from '../lib/database.js'
const rewards = {
  exp: 9999,
  money: 4999,
  potion: 5,
  trash: 101,
  string: 25,
  rock: 30,
  iron: 25,
  diamond: 10,
  emerald: 4,
}
const cooldown = 86400000
let handler = async (m,{ conn}, usedPrefix ) => {
  let user = global.db.data.users[m.sender]
  if (user.health < 80) return m.reply(`
Requires at least 80 ❤️Healths for the mining!!
please buy ❤️Healths first by typing * .buy potion <quantity>*,
and type * .heal <quantity>* to use potions
`.trim())
  //if (user.pickaxe == 0) return m.reply('for mining u need a picaxe 🗿')
  if (new Date - user.lastclaim < cooldown) throw `You alrady mining!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${reward}\n`
  }
  //conn.sendButton(m.chat,'*––––––『 MINE 』––––––*', text.trim(), null, [['Adventure', '.adventure'], ['Weekly', '.weekly']],m)
  m.reply(`
  🎁 *YOU WENT ON MINING *
  
  ▢ *AND GOT:*
   ${text}`)
  user.lastclaim = new Date * 1
}
handler.help = ['mine', 'mining']
handler.tags = ['xp']
handler.command = /^(mine|mining)$/i

handler.cooldown = cooldown

export default handler



function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}