import fetch from 'node-fetch'
let handler  = async (m, { conn }) => {
    let shizokeys = 'shizo'
  let res = await fetch(`https://shizoapi.cyclic.app/api/texts/dare?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
	    let json = await res.json()

  let guru = `${json.result}`
  conn.sendMessage(m.chat, { text: guru, mentions: [m.sender] }, { quoted: m })
}
handler.help = ['dare']
handler.tags = ['fun']
handler.command = /^(dare)$/i

export default handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
