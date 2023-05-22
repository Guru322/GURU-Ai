import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Jakarta').format('HH')
let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = await conn.profilePictureUrl(who,).catch(_ => './src/Whatsapp.mp4')
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
┏─────────────────⬣
┆ 𝑯𝒂𝒊, ${name}
┗┬──────────────┈ ⳹
┏┤ Bot Info  
┆┗──────────────┈ ⳹
┆♠︎ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botname}
┆♠︎ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 : ${author}
┆♠︎ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝗡𝗮𝗺𝗲 :Vivek
┆♠︎ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 :linux 
┆♠︎ *Uptime* : ${uptime}
┆♠︎ *Experience:* ${exp}
┆♠︎ *Rank:* ${role}
┆♠︎ *Diamonds:* ${diamond}
┆♠︎ *Total users:* ${rtotalreg}
┗┬──────────────┈ ⳹
┏┤   User Info
┆┗──────────────┈ ⳹ 
┆♠︎ 𝗡𝗮𝗺𝗲 :${name}
│♠︎ 𝗡𝘂𝗺𝗯𝗲𝗿 : ${taguser}
│♠︎ 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 : ${user.premium = 'true' ? '✅' : '❌'}
┗┬──────────────┈ ⳹
┏┤ Calender
┆┗──────────────┈ ⳹
┆Time :${wib} 
┆𝗗𝗮𝘁𝗲 :${date} 
┗─────────────────⬣
┏━━━━━━━━━━━━━━━━┓
┃  *<TROUBLEMAKER menu />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣  💟 tmai
┣  💟 tmanime
┣  💟 tmgpt
┣  💟 speedtest
┣  💟 owner
┣  💟 script
┣  💟 infobot
┣  💟 qrcode
┣  💟 readqr
┣  💟 weather
┣  💟 nowa
┣  💟 hornycard
┣  💟 simpcard
┣  💟 ytcomment
┣  💟 tmporn
┣  💟 whatmusic
┣  💟 lolicon
┣ 💎 _${usedPrefix}kick *<@tag>*_
┣ 💎 _${usedPrefix}promote *<@tag>*_
┣ 💎 _${usedPrefix}demote *<@tag>*_
┣ 💎 _${usedPrefix}demote *<@tag>*_
┣ 💎 _${usedPrefix}infogroup_
┣ 💎 _${usedPrefix}resetlink_
┣ 💎 _${usedPrefix}link_
┣ 💎 _${usedPrefix}setname *<text>*_
┣ 💎 _${usedPrefix}setdesc *<text>*_
┣ 💎 _${usedPrefix}invocar *<text>*_
┣ 💎 _${usedPrefix}setwelcome *<text>*_
┣ 💎 _${usedPrefix}setbye *<text>*_
┣ 💎 _${usedPrefix}hidetag *<text>*_
┣ 💎 _${usedPrefix}hidetag *<audio>*_
┣ 💎 _${usedPrefix}hidetag *<video>*_
┣ 💎 _${usedPrefix}hidetag *<image>*_
┣ 💎 _${usedPrefix}warn *<@tag>*_
┣ 💎 _${usedPrefix}unwarn *<@tag>*_
┣ 💎 _${usedPrefix}listwarn_
┣ 💎 _${usedPrefix}setpp *<image>*_
┣ 💵_${usedPrefix}balance_
┣ 💵 _${usedPrefix}claim_
┣ 💵 _${usedPrefix}lb_
┣ 💵 _${usedPrefix}levelup_
┣ 💵 _${usedPrefix}myns_
┣ 💵 _${usedPrefix}profile_
┣ 💵 _${usedPrefix}work_
┣ 💵 _${usedPrefix}adventure_
┣ 💵 _${usedPrefix}heal_
┣ 💵 _${usedPrefix}dungeon_
┣ 💵 _${usedPrefix}todiamond_
┣ 💵 _${usedPrefix}tomoney_
┣ 💵 _${usedPrefix}weekly_
┣ 💵 _${usedPrefix}monthly_
┣ 💵 _${usedPrefix}mine_
┣ 💵 _${usedPrefix}mine_
┣ 💵 _${usedPrefix}buy_
┣ 💵 _${usedPrefix}sell_
┣ 💵 _${usedPrefix}todiamondall_
┣ 💵 _${usedPrefix}register_
┣ 💵 _${usedPrefix}rob <@tag>*_
┣ 💵 _${usedPrefix}transfer *<type> <amount> <@tag>*_
┣ 💵 _${usedPrefix}ureg*<seriel num>*_
┣ 👑 _${usedPrefix}setprefix *<prefix>*_
┣ 👑 _${usedPrefix}resetprefix_
┣ 👑 _${usedPrefix}autoadmin_
┣ 👑 _${usedPrefix}leavegc_
┣ 👑 _${usedPrefix}blocklist_
┣ 👑 _${usedPrefix}block *<@tag / number>*_
┣ 👑 _${usedPrefix}unblock *<@tag / number>*_
┣ 👑 _${usedPrefix}enable *restrict*_
┣ 👑 _${usedPrefix}disable *restrict*_
┣ 👑 _${usedPrefix}enable *autoread*_
┣ 👑 _${usedPrefix}disable *autoread*_
┣ 👑 _${usedPrefix}enable *public*_
┣ 👑 _${usedPrefix}disable *public*_
┣ 👑 _${usedPrefix}enable *pconly*_
┣ 👑 _${usedPrefix}disable *pconly*_
┣ 👑 _${usedPrefix}enable *gconly*_
┣ 👑 _${usedPrefix}disable *gconly*_
┣ 👑 _${usedPrefix}msg *<text>*_
┣ 👑 _${usedPrefix}banchat_
┣ 👑 _${usedPrefix}unbanchat_
┣ 👑 _${usedPrefix}banuser *<@tag>*_
┣ 👑 _${usedPrefix}unbanuser *<@tag>*_
┣ 👑 _${usedPrefix}banuser *<@tag>*_
┣ 👑 _${usedPrefix}bc *<text>*_
┣ 👑 _${usedPrefix}bcbot *<text>*_
┣ 👑 _${usedPrefix}cleartpm_
┣ 👑 _${usedPrefix}restart_
┣ 👑 _${usedPrefix}update_
┣ 👑 _${usedPrefix}banlist_
┣ 👑 _${usedPrefix}addprem *<@tag>*_
┣ 👑 _${usedPrefix}delprem *<@tag>*_
┣ 👑 _${usedPrefix}listprem_
┣ 👑 _${usedPrefix}listcmd_
┣ 👑 _${usedPrefix}setppbot *<respondr a image>*_
┣ 👑 _${usedPrefix}addcmd *<text> <respond a sticker/image>*_
┣ 📥 _${usedPrefix}instagram *< / link / url>*_
┣ 📥 _${usedPrefix}mediafire *< LINK >
┣ 📥 _${usedPrefix}instagram *< link / url>*_
┣ 📥 _${usedPrefix}gitclone *< link / url>*_
┣ 📥 _${usedPrefix}gdrive *< link / url>*_
┣ 📥 _${usedPrefix}tiktok *< link / url>*_
┣ 📥 _${usedPrefix}xnxxdl *< link / url>*_
┣ 📥 _${usedPrefix}xvideosdl *<link / url>*_
┣ 📥 _${usedPrefix}twitter *<  link / url>*_
┣ 📥 _${usedPrefix}fb *< link / url>*_
┣ 📥 _${usedPrefix}ytmp3 *< link / url>*_
┣ 📥 _${usedPrefix}ytmp4 *< link / url>*_
┣ 📥 _${usedPrefix}ytmp3doc *< link / url>*_
┣ 📥 _${usedPrefix}ytmp4doc *< link / url>*_
┣ 📥 _${usedPrefix}play *<text>*_
┣ 📥 _${usedPrefix}spotify *<text>*_
┣ 🔞 _${usedPrefix}videoxxx_
┣ 🔞 _${usedPrefix}videolesbixxx_
┣ 🔞 _${usedPrefix}tit_
┣ 🔞 _${usedPrefix}booty_
┣ 🔞 _${usedPrefix}ecchi_
┣ 🔞 _${usedPrefix}furro_
┣ 🔞 _${usedPrefix}lesbians_
┣ 🔞 _${usedPrefix}panties_
┣ 🔞 _${usedPrefix}penis_
┣ 🔞 _${usedPrefix}porn_
┣ 🔞 _${usedPrefix}randomxxx_
┣ 🔞 _${usedPrefix}pechos_
┣ 🔞 _${usedPrefix}yaoi_
┣ 🔞 _${usedPrefix}yaoi2_
┣ 🔞 _${usedPrefix}yuri_
┣ 🔞 _${usedPrefix}yuri2_
┣ 🔞 _${usedPrefix}trap_
┣ 🔞 _${usedPrefix}hentai_
┣ 🔞 _${usedPrefix}hloli_
┣ 🔞 _${usedPrefix}orgy_
┣ 🔞 _${usedPrefix}foot_
┣ 🔞 _${usedPrefix}hass_
┣ 🔞 _${usedPrefix}bdsm_
┣ 🔞 _${usedPrefix}cum_
┣ 🔞 _${usedPrefix}ero_
┣ 🔞 _${usedPrefix}femdom_
┣ 🔞 _${usedPrefix}glass_
┣ 🔞 _${usedPrefix}hentai*_
┣ 🔞 _${usedPrefix}underwear_
┣ 🔞 _${usedPrefix}spussy_
┣ 🔞 _${usedPrefix}bunnygirl_
┣ 🔞 _${usedPrefix}bunnyear_
┣ 🔞 _${usedPrefix}sswimsuit_
┣ 🔞 _${usedPrefix}chain_
┣ 🔞 _${usedPrefix}genshin_
┣ 🔞 _${usedPrefix}white_
┣ 🔞 _${usedPrefix}barefoot_
┣ 🔞 _${usedPrefix}whitehair_
┣ 🔞 _${usedPrefix}touhou_
┣ 🔞 _${usedPrefix}holo_
┣ 🔞 _${usedPrefix}gamecg_
┣ 🔞 _${usedPrefix}uncensored_
┣ 🔞 _${usedPrefix}sunglass_
┣ 🔞 _${usedPrefix}glass_
┣ 🔞 _${usedPrefix}demon_
┣ 🔞 _${usedPrefix}bondage_
┣ 🔞 _${usedPrefix}torn cloth_
┣ 🔞 _${usedPrefix}fingering_
┣ 🔞 _${usedPrefix}gun_
┣ 🔞 _${usedPrefix}vampire_
┣ 🔞 _${usedPrefix}idol_
┣ 🔞 _${usedPrefix}beach_
┣ 🔞 _${usedPrefix}bra_
┣ 🔞 _${usedPrefix}topless_
┣ 🔞 _${usedPrefix}stokings_
┣ 🔞 _${usedPrefix}shorts_
┣ 🔞 _${usedPrefix}anus_
┣ 🔞 _${usedPrefix}tie_
┣ 🔞 _${usedPrefix}headphone_
┣ 🔞 _${usedPrefix}pantypull_
┣ 🔞 _${usedPrefix}wet_
┣ 🔞 _${usedPrefix}breast_
┣ 🔞 _${usedPrefix}twintail_
┣ 🔞 _${usedPrefix}sex_
┣ 🔞 _${usedPrefix}sex2_
┣ 🔞 _${usedPrefix}sex3_
┣ 🔞 _${usedPrefix}skirt_
┣ 🔞 _${usedPrefix}uniform_
┣ 🔞 _${usedPrefix}foxgirl_
┣ 🔞 _${usedPrefix}ponytail_
┣ 🔞 _${usedPrefix}nude_
┣ 🔞 _${usedPrefix}bed_
┣ 🔞 _${usedPrefix}pinkhair_
┣ 🔞 _${usedPrefix}bikini_
┣ 🔞 _${usedPrefix}nobra_
┣ 🔞 _${usedPrefix}maid_
┣ 🧧 _${usedPrefix}toimg *<sticker>*_
┣ 🧧 _${usedPrefix}tomp3 *<video>*_
┣ 🧧 _${usedPrefix}tovideo *<sticker>*_
┣ 🧧 _${usedPrefix}tourl *<video / image / audio>*_
┣ 🧧 _${usedPrefix}tts en *<text>*_
┣ 👾 _${usedPrefix}cristianoronaldo_
┣ 👾 _${usedPrefix}messi_
┣ 👾 _${usedPrefix}meme_
┣ 👾 _${usedPrefix}itzy_
┣ 👾 _${usedPrefix}blackpink_
┣ 👾 _${usedPrefix}lolivid_
┣ 👾 _${usedPrefix}loli_
┣ 👾 _${usedPrefix}navidad_
┣ 👾 _${usedPrefix}ppcouple_
┣ 👾 _${usedPrefix}wpmontaña_
┣ 👾 _${usedPrefix}pubg_
┣ 👾 _${usedPrefix}wpgaming_
┣ 👾 _${usedPrefix}wpaesthetic_
┣ 👾 _${usedPrefix}wpaesthetic2_
┣ 👾 _${usedPrefix}wprandom_
┣ 👾 _${usedPrefix}wallhp_
┣ 👾 _${usedPrefix}wpvehiculo_
┣ 👾 _${usedPrefix}wpmoto_
┣ 👾 _${usedPrefix}coffee_
┣ 👾 _${usedPrefix}pentol_
┣ 👾 _${usedPrefix}caricatura_
┣ 👾 _${usedPrefix}ciberespacio_
┣ 👾 _${usedPrefix}technology_
┣ 👾 _${usedPrefix}doraemon_
┣ 👾 _${usedPrefix}hacker_
┣ 👾 _${usedPrefix}planeta_
┣ 👾 _${usedPrefix}randomprofile_
┣ 👾 _${usedPrefix}neko_
┣ 👾 _${usedPrefix}waifu_
┣ 👾 _${usedPrefix}akira_
┣ 👾 _${usedPrefix}akiyama_
┣ 👾 _${usedPrefix}anna_
┣ 👾 _${usedPrefix}asuna_
┣ 👾 _${usedPrefix}ayuzawa_
┣ 👾 _${usedPrefix}boruto_
┣ 👾 _${usedPrefix}chiho_
┣ 👾 _${usedPrefix}chitoge_
┣ 👾 _${usedPrefix}deidara_
┣ 👾 _${usedPrefix}erza_
┣ 👾 _${usedPrefix}elaina_
┣ 👾 _${usedPrefix}eba_
┣ 👾 _${usedPrefix}emilia_
┣ 👾 _${usedPrefix}hestia_
┣ 👾 _${usedPrefix}hinata_
┣ 👾 _${usedPrefix}inori_
┣ 👾 _${usedPrefix}isuzu_
┣ 👾 _${usedPrefix}itachi_
┣ 👾 _${usedPrefix}itori_
┣ 👾 _${usedPrefix}kaga_
┣ 👾 _${usedPrefix}kagura_
┣ 👾 _${usedPrefix}kaori_
┣ 👾 _${usedPrefix}keneki_
┣ 👾 _${usedPrefix}kotori_
┣ 👾 _${usedPrefix}kurumi_
┣ 👾 _${usedPrefix}madara_
┣ 👾 _${usedPrefix}mikasa_
┣ 👾 _${usedPrefix}miku_
┣ 👾 _${usedPrefix}minato_
┣ 👾 _${usedPrefix}naruto_
┣ 👾 _${usedPrefix}nezuko_
┣ 👾 _${usedPrefix}sagiri_
┣ 👾 _${usedPrefix}sasuke_
┣ 👾 _${usedPrefix}sakura_
┣ 👾 _${usedPrefix}cosplay_
┣ 🛠️ _${usedPrefix}chatgpt *<text>*_
┣ 🛠️ _${usedPrefix}dall-e *<text>*_
┣ 🛠️ _${usedPrefix}styletext *<text>*_
┣ 👽 _${usedPrefix}sticker *<respond a image video>*_
┣ 👽 _${usedPrefix}sticker *<link / url>*_
┣ 👽 _${usedPrefix}s *<respond a image video>*_
┣ 👽 _${usedPrefix}s *<link / url>*_
┣ 👽 _${usedPrefix}sfull *<imagen o video>*_
┣ 👽 _${usedPrefix}emojimix *<emoji 1>&<emoji 2>*_
┣ 👽 _${usedPrefix}scircle *<image>*_
┣ 👽 _${usedPrefix}sremovebg *<image>*_
┣ 👽 _${usedPrefix}semoji *<tip> <emoji>*_
┣ 👽 _${usedPrefix}attp *<text>*_
┣ 👽 _${usedPrefix}attp2 *<text>*_
┣ 👽 _${usedPrefix}attp3 *<text>*_
┣ 👽 _${usedPrefix}ttp *<text>*_
┣ 👽 _${usedPrefix}ttp2 *<text>*_
┣ 👽 _${usedPrefix}ttp3 *<text>*_
┣ 👽 _${usedPrefix}ttp4 *<text>*_
┣ 👽 _${usedPrefix}ttp5 *<text>*_
┣ 👽 _${usedPrefix}pat *<@tag>*_
┣ 👽 _${usedPrefix}slap *<@tag>*_
┣ 👽 _${usedPrefix}kiss *<@tag>*_
┣ 👽 _${usedPrefix}wm *<packname> <author>*_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┆──────────────┈ ⳹
┆type /list to
┆to see all cmd
┗─────────────────⬣`
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false, { mentions: [who] })
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help','h','command'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
    function ucapan() {
      const time = moment.tz('Asia/Kolkata').format('HH')
      let res = "happy early in the day☀️"
      if (time >= 4) {
        res = "Good Morning 🌄"
      }
      if (time >= 10) {
        res = "Good Afternoon ☀️"
      }
      if (time >= 15) {
        res = "Good Afternoon 🌇"
      }
      if (time >= 18) {
        res = "Good Night 🌙"
      }
      return res
    }
