import fetch from 'node-fetch'
import fs from 'fs'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {
    let user = global.db.data.users[m.sender] 
    let name = await conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender]
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(850)   
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let m2 = `
╭═══〘 ✯✯✯✯✯✯✯ 〙══╮
║    *ᴛʜᴇ ɢᴜʀᴜ-ʙᴏᴛ* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *𝗛ii, ${taguser}* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *Creater:* Guru
║➤ *Number:* wa.me/917605902011
║➤ *Bot ofc:* wa.me/19048880099
║➤ *Insta:* asli_guru69
║➤ *Total Users:* ${rtotalreg}
╰═══╡✯✯✯✯✯✯✯╞═══╯
┏━━━━━━━━━━━━━━━━┓
┃ *< USER INFO />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ *🎖️ level:* ${level}
┣ *🧰 Experience:* ${exp}
┣ *⚓ Rank:* ${role}
┣ *💎 Diamonds:* ${diamond}
┣ *🎟️ Premium:* ${user.premium = 'true' ? '✅' : '❌'}
┗━━━━━━━━━━━━━━━━┛
${readMore}

┏━━━━━━━━━━━━━━━━┓
┃  *< MAIN />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣  💟 groups
┣  💟 infobot
┣  💟 speedtest
┣  💟 grouplist
┣  💟 owner
┣  💟 script
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
┃ *< GROUPS />* 
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 💎 _${usedPrefix}kick *<@tag>*_
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
┣ ඬ⃟ 💵 _${usedPrefix}transfer *<type> <amount> <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}ureg*<seriel num>*_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
┃ *< OWNER />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 👑 > *<function>*
┣ ඬ⃟ 👑 => *<function>*
┣ ඬ⃟ 👑 $ *<function>*
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
┣ ඬ⃟ 📥 _${usedPrefix}spotify *<text>*_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
┃ *< NSFW />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ ඬ⃟ 🔞 _${usedPrefix}videoxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}videolesbixxx_
┣ ඬ⃟ 🔞 _${usedPrefix}tit_
┣ ඬ⃟ 🔞 _${usedPrefix}booty_
┣ ඬ⃟ 🔞 _${usedPrefix}ecchi_
┣ ඬ⃟ 🔞 _${usedPrefix}furro_
┣ ඬ⃟ 🔞 _${usedPrefix}lesbians_
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
┣ ඬ⃟ 🔞 _${usedPrefix}hloli_
┣ ඬ⃟ 🔞 _${usedPrefix}orgy_
┣ ඬ⃟ 🔞 _${usedPrefix}foot_
┣ ඬ⃟ 🔞 _${usedPrefix}hass_
┣ ඬ⃟ 🔞 _${usedPrefix}bdsm_
┣ ඬ⃟ 🔞 _${usedPrefix}cum_
┣ ඬ⃟ 🔞 _${usedPrefix}ero_
┣ ඬ⃟ 🔞 _${usedPrefix}femdom_
┣ ඬ⃟ 🔞 _${usedPrefix}glass_
┣ ඬ⃟ 🔞 _${usedPrefix}hentai*_
┣ ඬ⃟ 🔞 _${usedPrefix}underwear_
┣ ඬ⃟ 🔞 _${usedPrefix}spussy_
┣ ඬ⃟ 🔞 _${usedPrefix}bunnygirl_
┣ ඬ⃟ 🔞 _${usedPrefix}bunnyear_
┣ ඬ⃟ 🔞 _${usedPrefix}sswimsuit_
┣ ඬ⃟ 🔞 _${usedPrefix}chain_
┣ ඬ⃟ 🔞 _${usedPrefix}genshin_
┣ ඬ⃟ 🔞 _${usedPrefix}white_
┣ ඬ⃟ 🔞 _${usedPrefix}barefoot_
┣ ඬ⃟ 🔞 _${usedPrefix}whitehair_
┣ ඬ⃟ 🔞 _${usedPrefix}touhou_
┣ ඬ⃟ 🔞 _${usedPrefix}holo_
┣ ඬ⃟ 🔞 _${usedPrefix}gamecg_
┣ ඬ⃟ 🔞 _${usedPrefix}uncensored_
┣ ඬ⃟ 🔞 _${usedPrefix}sunglass_
┣ ඬ⃟ 🔞 _${usedPrefix}glass_
┣ ඬ⃟ 🔞 _${usedPrefix}demon_
┣ ඬ⃟ 🔞 _${usedPrefix}bondage_
┣ ඬ⃟ 🔞 _${usedPrefix}torn cloth_
┣ ඬ⃟ 🔞 _${usedPrefix}fingering_
┣ ඬ⃟ 🔞 _${usedPrefix}gun_
┣ ඬ⃟ 🔞 _${usedPrefix}vampire_
┣ ඬ⃟ 🔞 _${usedPrefix}idol_
┣ ඬ⃟ 🔞 _${usedPrefix}beach_
┣ ඬ⃟ 🔞 _${usedPrefix}bra_
┣ ඬ⃟ 🔞 _${usedPrefix}topless_
┣ ඬ⃟ 🔞 _${usedPrefix}stokings_
┣ ඬ⃟ 🔞 _${usedPrefix}shorts_
┣ ඬ⃟ 🔞 _${usedPrefix}anus_
┣ ඬ⃟ 🔞 _${usedPrefix}tie_
┣ ඬ⃟ 🔞 _${usedPrefix}headphone_
┣ ඬ⃟ 🔞 _${usedPrefix}pantypull_
┣ ඬ⃟ 🔞 _${usedPrefix}wet_
┣ ඬ⃟ 🔞 _${usedPrefix}breast_
┣ ඬ⃟ 🔞 _${usedPrefix}twintail_
┣ ඬ⃟ 🔞 _${usedPrefix}sex_
┣ ඬ⃟ 🔞 _${usedPrefix}sex2_
┣ ඬ⃟ 🔞 _${usedPrefix}sex3_
┣ ඬ⃟ 🔞 _${usedPrefix}skirt_
┣ ඬ⃟ 🔞 _${usedPrefix}uniform_
┣ ඬ⃟ 🔞 _${usedPrefix}foxgirl_
┣ ඬ⃟ 🔞 _${usedPrefix}ponytail_
┣ ඬ⃟ 🔞 _${usedPrefix}nude_
┣ ඬ⃟ 🔞 _${usedPrefix}bed_
┣ ඬ⃟ 🔞 _${usedPrefix}pinkhair_
┣ ඬ⃟ 🔞 _${usedPrefix}bikini_
┣ ඬ⃟ 🔞 _${usedPrefix}nobra_
┣ ඬ⃟ 🔞 _${usedPrefix}maid_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
┃ *< NOTE />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ soon adding more
┣ sticker cmds are
┣ there For logo
┣ makers type 
┣ _${usedPrefix}logo_
┗━━━━━━━━━━━━━━━━┛
`
let pp = './Guru.jpg' 
    conn.sendButton(m.chat, m2, '▢ ᴳᵁᴿᵁ  ┃ ᴮᴼᵀ\n▢ Follow on Instagram\nhttps://www.instagram.com/asli_guru69\n', pp, 
      ['⌬ Groups', `${usedPrefix}gpguru`]
    ,m, rpyt)
    //await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
   
}

handler.help = ['audios']
handler.tags = ['main']
handler.command = ['menu', 'help', 'h'] 

export default handler
