//import db from '../lib/database.js'

let handler = m => m
handler.before = async function (m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.text || !/^▢ HOW MUCH IS IT/i.test(m.quoted.text))
    return !0
  this.math = this.math ? this.math : {}
  if (!(id in this.math)) return this.reply(m.chat, 'The game is over', m)
  if (m.quoted.id == this.math[id][0].id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]))
    if (m.text == math.result) {
      global.db.data.users[m.sender].exp += math.bonus
      clearTimeout(this.math[id][3])
      delete this.math[id]
      m.reply(`✅ *Correct answer!*\n\n‣ won : *+${math.bonus} XP*`)
    } else {
      if (--this.math[id][2] == 0) {
        clearTimeout(this.math[id][3])
        delete this.math[id]
        m.reply(`*The opportunities are over*\n\n Response : *${math.result}*`)
      } else m.reply(`❎ *Wrong answer*\n\nThere are still  ${this.math[id][2]} opportuniities`)
    }
  }
  return !0
}

export default handler
