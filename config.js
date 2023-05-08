import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'


global.owner = [
  ['447418347824', 'cachinero maldito', true],
  ['15106295219', 'fuck oof', true], 
  [''] 
] //Number of owners

global.mods = ['447418347824','51918837076'] 
global.prems = ['447418347824', '51918837076', '529934191636']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['BrunoSobrino']

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`, 
  'https://api-fgmods.ddns.net': 'fg-dylux'
}

// Sticker WM
global.botname = 'ᴠɪɢɢᴏ-ʙᴏᴛ'
global.premium = 'true'
global.packname = 'Ⓥⓘⓖⓖⓞ' 
global.author = '𝙿𝚒𝚎𝚗𝚜𝚊, 𝚜𝚞𝚎𝚗̃𝚊, 𝚌𝚛𝚎𝚎 𝚢 𝚊𝚝𝚛𝚎́𝚟𝚎𝚝𝚎🌻: 𝙰𝚋𝚒-𝙳𝚊𝚗-𝚂𝚘𝚏𝚒-𝚁𝚘𝚡𝚢-𝚂𝚊𝚕𝚘-𝙶𝚎𝚛-𝙱𝚊𝚛-𝙸𝚜𝚜𝚊-𝚂𝚘𝚏𝚒𝚋𝚋-𝚂𝚛🦇-𝙺𝚒𝚛𝚒-𝙻𝚎𝚡-𝚈𝚎𝚒-𝚂𝚑𝚒𝚟𝚒𝚜🍒 𝗙●𝗨●𝗖●𝗞 ≖ 𝗢●𝗙●𝗙🖕🏻😈😇' 
global.igfg = '▢ Follow on Instagram' 
global.dygp = 'https://chat.whatsapp.com/DGjCag8omSGG8irBcYDEYn'
global.fgsc = 'https://chat.whatsapp.com/DGjCag8omSGG8irBcYDEYn' 
global.fgyt = 'https://chat.whatsapp.com/DGjCag8omSGG8irBcYDEYn'
global.fgpyp = 'https://chat.whatsapp.com/DGjCag8omSGG8irBcYDEYn'
global.fglog = 'https://raw.githubusercontent.com/Guru322/api/Guru/guru.jpg' 
global.dbase = 'mongodb+srv://guru:guru@cluster0.qpggl6x.mongodb.net/?retryWrites=true&w=majority' //ADD YOUR MONGODB BY CHANGIMG IT

global.wait = '*⌛ _Cargando espere..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '3' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
