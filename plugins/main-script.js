import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`
type 'usedPrefix'menu for command list )
    
}

handler.help = ['script']
handler.tags = ['main']
handler.command = [''] 

export default handler
