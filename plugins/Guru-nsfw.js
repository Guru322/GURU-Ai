import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
m.react(rwait)

let res = await fetch(`https://fantox-apis.vercel.app/${command}`)
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.url) throw '❎ Error'
conn.sendFile(m.chat, json.url, 'img.jpg', `✅ Random ${command}`, m)
m.react(dmoji)
}
handler.help = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'holo', 'uncensored', 'sunglass', 'glass', 'weapon', 'shirt lift', 'chain', 'fingering', 'flat chest', 'torn cloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anus', 'shorts','stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spussy' ]
handler.command = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'holo', 'uncensored', 'sunglass', 'glass', 'weapon', 'shirt lift', 'chain', 'fingering', 'flat chest', 'torn cloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anus', 'shorts','stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spussy']
handler.tags = ['nsfw'] 
handler.diamond = true
handler.group = true
handler.register = true


export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
