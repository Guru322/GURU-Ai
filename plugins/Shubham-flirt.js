import fetch from 'node-fetch'
let handler  = async (m, { conn }) => {
	
  let res = await fetch(`https://api.shizo-devs.repl.co/api/texts/flirt?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
	    let json = await res.json()

  let shizo = `${json.result}`
  conn.sendMessage(m.chat, { text: shizo, mentions: [m.sender] }, { quoted: m })
}
handler.help = ['flirt']
handler.tags = ['quotes']
handler.command = /^(flirt)$/i

export default handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
