import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {

  let earn = Math.floor(Math.random() * 2000)
  let time = global.db.data.users[m.sender].lastwork + 600000
  if (new Date - global.db.data.users[m.sender].lastwork < 600000) throw `⏱️ You cannot work for ${msToTime(time - new Date())}`

    let anu = (await axios.get('https://raw.githubusercontent.com/Amrit9304/work/main/work.json')).data
    let res = pickRandom(anu)
 global.db.data.users[m.sender].credit += earn

  m.reply(`
‣ ${res.wrk} ${earn} gold
`)
  global.db.data.users[m.sender].lastwork = new Date * 1
}
handler.help = ['work']
handler.tags = ['economy']
handler.command = ['work', 'w']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return minutes + " minutes " + seconds + " seconds" 
}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
