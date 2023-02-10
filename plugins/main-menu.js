import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {
try {
let vn = './src/mp3/Guru.mp3'
let img = await(await fetch('https://cdn.jsdelivr.net/gh/Guru322/api@Guru/guru.jpg')).buffer()
let d = new Date(new Date + 3600000)
let locale = 'en'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let name = await conn.getName(m.sender)
let { money, joincount } = global.db.data.users[m.sender]
let { exp, diamond, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
╭═══〘 ✯✯✯✯✯✯✯ 〙══╮
║    *ᴛʜᴇ ɢᴜʀᴜ-ʙᴏᴛ* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *Hii, %name*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *Creater:* Guru
║➤ *Number:* wa.me/917605902011
║➤ *Bot ofc:* wa.me/19048885690
║➤ *Insta:* asli_guru69
║➤ *Date: %date*  
║➤ *Runtime: %muptime*
║➤ *Total users:* %rtotalreg
╰═══╡✯✯✯✯✯✯✯╞═══╯

┏━━━━━━━━━━━━━━━━┓
┃ *< USER INFO />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ *🎖️ Level:* %level
┣ *🧰 Experience:* %exp
┣ *⚓ Rank:* %role
┣ *💎 Diamonds:* %limit
┗━━━━━━━━━━━━━━━━┛
${readMore}
┏━━━━━━━━━━━━━━━━┓
┃ *< BOT INFO />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 💟 _${usedPrefix}groups_
┣ ඬ⃟ 💟 _${usedPrefix}infobot_
┣ ඬ⃟ 💟 _${usedPrefix}speedtest_
┣ ඬ⃟ 💟 _${usedPrefix}grouplist_
┣ ඬ⃟ 💟 _${usedPrefix}owner_
┣ ඬ⃟ 💟 _${usedPrefix}script_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< GROUPS />* 
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 💎 _${usedPrefix}kick *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}grupo *<abrir / cerrar>*_
┣ ඬ⃟ 💎 _${usedPrefix}grouptime *<opcion> <tiempo>*_
┣ ඬ⃟ 💎 _${usedPrefix}promote *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}demote *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}demote *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}infogroup_
┣ ඬ⃟ 💎 _${usedPrefix}resetlink_
┣ ඬ⃟ 💎 _${usedPrefix}link_
┣ ඬ⃟ 💎 _${usedPrefix}setname *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}setdesc *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}invocar *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}setwelcome *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}setbye *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}hidetag *<text>*_
┣ ඬ⃟ 💎 _${usedPrefix}hidetag *<audio>*_
┣ ඬ⃟ 💎 _${usedPrefix}hidetag *<video>*_
┣ ඬ⃟ 💎 _${usedPrefix}hidetag *<image>*_
┣ ඬ⃟ 💎 _${usedPrefix}warn *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}unwarn *<@tag>*_
┣ ඬ⃟ 💎 _${usedPrefix}listwarn_
┣ ඬ⃟ 💎 _${usedPrefix}setpp *<image>*_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< ECONOMY />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 💵 _${usedPrefix}balance_
┣ ඬ⃟ 💵 _${usedPrefix}claim_
┣ ඬ⃟ 💵 _${usedPrefix}lb_
┣ ඬ⃟ 💵 _${usedPrefix}levelup_
┣ ඬ⃟ 💵 _${usedPrefix}myns_
┣ ඬ⃟ 💵 _${usedPrefix}profile_
┣ ඬ⃟ 💵 _${usedPrefix}work_
┣ ඬ⃟ 💵 _${usedPrefix}mine_
┣ ඬ⃟ 💵 _${usedPrefix}mine_
┣ ඬ⃟ 💵 _${usedPrefix}buy_
┣ ඬ⃟ 💵 _${usedPrefix}buyall_
┣ ඬ⃟ 💵 _${usedPrefix}register_
┣ ඬ⃟ 💵 _${usedPrefix}rob <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}transfer *<tipo> <cantidad> <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}unreg *<seriel num>*_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< OWNER />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 👑 > *<funcion>*
┣ ඬ⃟ 👑 => *<funcion>*
┣ ඬ⃟ 👑 $ *<funcion>*
┣ ඬ⃟ 👑 _${usedPrefix}setprefix *<prefix>*_
┣ ඬ⃟ 👑 _${usedPrefix}resetprefix_
┣ ඬ⃟ 👑 _${usedPrefix}autoadmin_
┣ ඬ⃟ 👑 _${usedPrefix}leavegc_
┣ ඬ⃟ 👑 _${usedPrefix}blocklist_
┣ ඬ⃟ 👑 _${usedPrefix}block *<@tag / number>*_
┣ ඬ⃟ 👑 _${usedPrefix}unblock *<@tag / number>*_
┣ ඬ⃟ 👑 _${usedPrefix}enable *restrict*_
┣ ඬ⃟ 👑 _${usedPrefix}disable *restrict*_
┣ ඬ⃟ 👑 _${usedPrefix}enable *autoread*_
┣ ඬ⃟ 👑 _${usedPrefix}disable *autoread*_
┣ ඬ⃟ 👑 _${usedPrefix}enable *public*_
┣ ඬ⃟ 👑 _${usedPrefix}disable *public*_
┣ ඬ⃟ 👑 _${usedPrefix}enable *pconly*_
┣ ඬ⃟ 👑 _${usedPrefix}disable *pconly*_
┣ ඬ⃟ 👑 _${usedPrefix}enable *gconly*_
┣ ඬ⃟ 👑 _${usedPrefix}disable *gconly*_
┣ ඬ⃟ 👑 _${usedPrefix}msg *<text>*_
┣ ඬ⃟ 👑 _${usedPrefix}banchat_
┣ ඬ⃟ 👑 _${usedPrefix}unbanchat_
┣ ඬ⃟ 👑 _${usedPrefix}banuser *<@tag>*_
┣ ඬ⃟ 👑 _${usedPrefix}unbanuser *<@tag>*_
┣ ඬ⃟ 👑 _${usedPrefix}banuser *<@tag>*_
┣ ඬ⃟ 👑 _${usedPrefix}bc *<text>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcchats *<text>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcgc *<text>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcgc2 *<audio>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcgc2 *<video>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcgc2 *<image>*_
┣ ඬ⃟ 👑 _${usedPrefix}bcbot *<text>*_
┣ ඬ⃟ 👑 _${usedPrefix}cleartpm_
┣ ඬ⃟ 👑 _${usedPrefix}restart_
┣ ඬ⃟ 👑 _${usedPrefix}update_
┣ ඬ⃟ 👑 _${usedPrefix}banlist_
┣ ඬ⃟ 👑 _${usedPrefix}addprem *<@tag>*_
┣ ඬ⃟ 👑 _${usedPrefix}delprem *<@tag>*_
┣ ඬ⃟ 👑 _${usedPrefix}listprem_
┣ ඬ⃟ 👑 _${usedPrefix}listcmd_
┣ ඬ⃟ 👑 _${usedPrefix}setppbot *<respondr a image>*_
┣ ඬ⃟ 👑 _${usedPrefix}addcmd *<texto> <respond a sticker/image>*_
┣ ඬ⃟ 👑 _${usedPrefix}delcmd *<respond a sticker/imagen con comando o texto asignado>*_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< DOWNLOADER />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 📥 _${usedPrefix}instagram *< / link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}mediafire *< LINK >
┣ ඬ⃟ 📥 _${usedPrefix}instagram *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}gitclone *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}gdrive *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}tiktok *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}xnxxdl *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}xvideosdl *<link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}twitter *<  link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}fb *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}ytmp3 *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}ytmp4 *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}ytmp3doc *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}ytmp4doc *< link / url>*_
┣ ඬ⃟ 📥 _${usedPrefix}play *<text>*_
┣ ඬ⃟ 📥 _${usedPrefix}playdoc *<text>*_
┣ ඬ⃟ 📥 _${usedPrefix}playlist *<text>*_
┣ ඬ⃟ 📥 _${usedPrefix}spotify *<text>*_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< NSFW />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 🔞 _${usedPrefix}pack_
┣ ඬ⃟ 🔞 _${usedPrefix}pack2_
┣ ඬ⃟ 🔞 _${usedPrefix}pack3_
┣ ඬ⃟ 🔞 _${usedPrefix}videoxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}videolesbixxx_
┣ ඬ⃟ 🔞 _${usedPrefix}tit_
┣ ඬ⃟ 🔞 _${usedPrefix}booty_
┣ ඬ⃟ 🔞 _${usedPrefix}ecchi_
┣ ඬ⃟ 🔞 _${usedPrefix}furro_
┣ ඬ⃟ 🔞 _${usedPrefix}imagenlesbians_
┣ ඬ⃟ 🔞 _${usedPrefix}panties_
┣ ඬ⃟ 🔞 _${usedPrefix}penis_
┣ ඬ⃟ 🔞 _${usedPrefix}porn_
┣ ඬ⃟ 🔞 _${usedPrefix}randomxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}pechos_
┣ ඬ⃟ 🔞 _${usedPrefix}yaoi_
┣ ඬ⃟ 🔞 _${usedPrefix}yaoi2_
┣ ඬ⃟ 🔞 _${usedPrefix}yuri_
┣ ඬ⃟ 🔞 _${usedPrefix}yuri2_
┣ ඬ⃟ 🔞 _${usedPrefix}trap_
┣ ඬ⃟ 🔞 _${usedPrefix}hentai_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwloli_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfworgy_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwfoot_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwass_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwbdsm_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwcum_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwero_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwfemdom_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwglass_
┣ ඬ⃟ 🔞 _${usedPrefix}hentaipdf *<text>*_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
┃ *< NOTE />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ soon adding more
┣ sticker cmds are
┣ there some logo
┣ maker
┗━━━━━━━━━━━━━━━━┛
`.trim()
let buttons = [
{ buttonId: '#gpguru', buttonText: { displayText: '📮 GROUPS 📮' }, type: 1 },
{ buttonId: '#infobot', buttonText: { displayText: '🐾 INFOBOT 🐾' }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: 'VIDEO',
mediaUrl: null,
title: 'ɢᴜʀᴜ-ʙᴏᴛ',
body: null,
thumbnail: pp,
sourceUrl: `https://guruanime.vercel.app`
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
} catch {
conn.reply(m.chat, '*❗ MENU HAS SOME ERRORS*', m)
}}
handler.command = /^(menu2|men|memu|men|help2|command|allmenu|h|menu1.2|commands|commandos|cmd)$/i
handler.exp = 50
handler.fail = null
export default handler
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
