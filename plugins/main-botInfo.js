import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn, usedPrefix, command }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  let old = performance.now()
  
  let neww = performance.now()
  let speed = neww - old
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
let user = global.db.data.users[who]
  
let infobt = `
*╅╌❐-" 𝙄𝙉𝙁𝙊 𝘽𝙊𝙏 🂱*
  
*╅╌❐-" 𝙎𝙏𝘼𝙏𝙀 🂱*

 *╅╌❐-"  ${groupsIn.length}  𝙂𝙍𝙊𝙐𝙋 𝘾𝙃𝘼𝙏 🂱*
 *╅╌❐-"  ${groupsIn.length}  𝙐𝙉𝙄𝙏𝙀𝘿 𝙂𝙍𝙊𝙐𝙋𝙎 🂱*
 *╅╌❐-"  ${groupsIn.length - groupsIn.length}  𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝙀𝘿 𝙂𝙍𝙊𝙐𝙋𝙎 🂱*
 *╅╌❐-"  ${chats.length - groupsIn.length}  𝙋𝙍𝙄𝙑𝘼𝙏𝙀 𝘾𝙃𝘼𝙏𝙎 🂱*
 *╅╌❐-"  ${chats.length} 𝙏𝙊𝙏𝘼𝙇 𝘾𝙃𝘼𝙏𝙎 🂱*

*╅╌❐-" 𝙊𝙒𝙉𝙀𝙍 ☞︎︎︎ 𝙈𝘼𝙉𝙉𝙊-🂱*
  
  
*╅╌❐-" 𝙂𝙞𝙩𝙝𝙪𝙗:*
*╅╌❐-"  https://github.com/Itxmanno05/MANNO-BOT*

*╅╌❐-" 𝙎 𝙀 𝙍 𝙑 𝙀 𝙍*
*🛑 𝙍𝘼𝙈: ${format(totalmem() - freemem())} / ${format(totalmem())}*
*🔵 𝙁𝙍𝙀𝙀 𝙍𝘼𝙈𝙀: ${format(freemem())}*

*╅╌❐-" 𝙉𝙊𝘿𝙀 𝙅𝙎 𝙈𝙀𝙈𝙊𝙍𝙔*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}
`
conn.sendFile(m.chat, pp, 'prefil.jpg', infobt, m, false, { mentions: [who] })
m.react(done)

}
handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'infobot', 'botinfo']

export default handler
