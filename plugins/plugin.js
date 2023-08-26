import fetch from 'node-fetch'
import * as fs from 'fs'

let handler = async (m, { args }) => {
  if (!args[0]) {
    m.reply('Please provide a Gist URL.');
    return;
  }

  let url = args[0]

  let filename = url.split('/').pop() 
  if (!filename.includes('.')) filename += '.js'

  let res = await fetch(url)
  let text = await res.text()

  await fs.writeFileSync(`./plugins/${filename}`, text)
  
  m.reply(`Saved ${url} as ./plugins/${filename}`)

}

handler.help = ['plugin <url>']
handler.tags = ['owner']
handler.command = /^plugin$/i 
handler.rowner = true
export default handler
