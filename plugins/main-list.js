let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems })  => m.reply(`
┏━━━━━━━━━━━━━━━━┓
┃  *<All menu />*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣  💟 groups
┣  💟 infobot
┣  💟 speedtest
┣  💟 grouplist
┣  💟 owner
┣  💟 script
┣  💟 toanime
┣  💟 qrcode
┣  💟 readqr
┣  💟 weather
┣  💟 nowa
┣  💟 hornycard
┣  💟 simpcard
┣  💟 ytcomment
┣  💟 whatmusic
┣  💟 lolicon
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
┣ ඬ⃟ 💵 _${usedPrefix}balance_
┣ ඬ⃟ 💵 _${usedPrefix}claim_
┣ ඬ⃟ 💵 _${usedPrefix}lb_
┣ ඬ⃟ 💵 _${usedPrefix}levelup_
┣ ඬ⃟ 💵 _${usedPrefix}myns_
┣ ඬ⃟ 💵 _${usedPrefix}profile_
┣ ඬ⃟ 💵 _${usedPrefix}work_
┣ ඬ⃟ 💵 _${usedPrefix}adventure_
┣ ඬ⃟ 💵 _${usedPrefix}heal_
┣ ඬ⃟ 💵 _${usedPrefix}dungeon_
┣ ඬ⃟ 💵 _${usedPrefix}todiamond_
┣ ඬ⃟ 💵 _${usedPrefix}tomoney_
┣ ඬ⃟ 💵 _${usedPrefix}weekly_
┣ ඬ⃟ 💵 _${usedPrefix}monthly_
┣ ඬ⃟ 💵 _${usedPrefix}mine_
┣ ඬ⃟ 💵 _${usedPrefix}mine_
┣ ඬ⃟ 💵 _${usedPrefix}buy_
┣ ඬ⃟ 💵 _${usedPrefix}sell_
┣ ඬ⃟ 💵 _${usedPrefix}todiamondall_
┣ ඬ⃟ 💵 _${usedPrefix}register_
┣ ඬ⃟ 💵 _${usedPrefix}rob <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}transfer *<type> <amount> <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}ureg*<seriel num>*_
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
┣ ඬ⃟ 👑 _${usedPrefix}addcmd *<text> <respond a sticker/image>*_
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
┣ ඬ⃟ 🧧 _${usedPrefix}toimg *<sticker>*_
┣ ඬ⃟ 🧧 _${usedPrefix}tomp3 *<video>*_
┣ ඬ⃟ 🧧 _${usedPrefix}tovideo *<sticker>*_
┣ ඬ⃟ 🧧 _${usedPrefix}tourl *<video / image / audio>*_
┣ ඬ⃟ 🧧 _${usedPrefix}tts en *<text>*_
┣ ඬ⃟ 👾 _${usedPrefix}cristianoronaldo_
┣ ඬ⃟ 👾 _${usedPrefix}messi_
┣ ඬ⃟ 👾 _${usedPrefix}meme_
┣ ඬ⃟ 👾 _${usedPrefix}itzy_
┣ ඬ⃟ 👾 _${usedPrefix}blackpink_
┣ ඬ⃟ 👾 _${usedPrefix}lolivid_
┣ ඬ⃟ 👾 _${usedPrefix}loli_
┣ ඬ⃟ 👾 _${usedPrefix}navidad_
┣ ඬ⃟ 👾 _${usedPrefix}ppcouple_
┣ ඬ⃟ 👾 _${usedPrefix}wpmontaña_
┣ ඬ⃟ 👾 _${usedPrefix}pubg_
┣ ඬ⃟ 👾 _${usedPrefix}wpgaming_
┣ ඬ⃟ 👾 _${usedPrefix}wpaesthetic_
┣ ඬ⃟ 👾 _${usedPrefix}wpaesthetic2_
┣ ඬ⃟ 👾 _${usedPrefix}wprandom_
┣ ඬ⃟ 👾 _${usedPrefix}wallhp_
┣ ඬ⃟ 👾 _${usedPrefix}wpvehiculo_
┣ ඬ⃟ 👾 _${usedPrefix}wpmoto_
┣ ඬ⃟ 👾 _${usedPrefix}coffee_
┣ ඬ⃟ 👾 _${usedPrefix}pentol_
┣ ඬ⃟ 👾 _${usedPrefix}caricatura_
┣ ඬ⃟ 👾 _${usedPrefix}ciberespacio_
┣ ඬ⃟ 👾 _${usedPrefix}technology_
┣ ඬ⃟ 👾 _${usedPrefix}doraemon_
┣ ඬ⃟ 👾 _${usedPrefix}hacker_
┣ ඬ⃟ 👾 _${usedPrefix}planeta_
┣ ඬ⃟ 👾 _${usedPrefix}randomprofile_
┣ ඬ⃟ 👾 _${usedPrefix}neko_
┣ ඬ⃟ 👾 _${usedPrefix}waifu_
┣ ඬ⃟ 👾 _${usedPrefix}akira_
┣ ඬ⃟ 👾 _${usedPrefix}akiyama_
┣ ඬ⃟ 👾 _${usedPrefix}anna_
┣ ඬ⃟ 👾 _${usedPrefix}asuna_
┣ ඬ⃟ 👾 _${usedPrefix}ayuzawa_
┣ ඬ⃟ 👾 _${usedPrefix}boruto_
┣ ඬ⃟ 👾 _${usedPrefix}chiho_
┣ ඬ⃟ 👾 _${usedPrefix}chitoge_
┣ ඬ⃟ 👾 _${usedPrefix}deidara_
┣ ඬ⃟ 👾 _${usedPrefix}erza_
┣ ඬ⃟ 👾 _${usedPrefix}elaina_
┣ ඬ⃟ 👾 _${usedPrefix}eba_
┣ ඬ⃟ 👾 _${usedPrefix}emilia_
┣ ඬ⃟ 👾 _${usedPrefix}hestia_
┣ ඬ⃟ 👾 _${usedPrefix}hinata_
┣ ඬ⃟ 👾 _${usedPrefix}inori_
┣ ඬ⃟ 👾 _${usedPrefix}isuzu_
┣ ඬ⃟ 👾 _${usedPrefix}itachi_
┣ ඬ⃟ 👾 _${usedPrefix}itori_
┣ ඬ⃟ 👾 _${usedPrefix}kaga_
┣ ඬ⃟ 👾 _${usedPrefix}kagura_
┣ ඬ⃟ 👾 _${usedPrefix}kaori_
┣ ඬ⃟ 👾 _${usedPrefix}keneki_
┣ ඬ⃟ 👾 _${usedPrefix}kotori_
┣ ඬ⃟ 👾 _${usedPrefix}kurumi_
┣ ඬ⃟ 👾 _${usedPrefix}madara_
┣ ඬ⃟ 👾 _${usedPrefix}mikasa_
┣ ඬ⃟ 👾 _${usedPrefix}miku_
┣ ඬ⃟ 👾 _${usedPrefix}minato_
┣ ඬ⃟ 👾 _${usedPrefix}naruto_
┣ ඬ⃟ 👾 _${usedPrefix}nezuko_
┣ ඬ⃟ 👾 _${usedPrefix}sagiri_
┣ ඬ⃟ 👾 _${usedPrefix}sasuke_
┣ ඬ⃟ 👾 _${usedPrefix}sakura_
┣ ඬ⃟ 👾 _${usedPrefix}cosplay_
┣ ඬ⃟ 🛠️ _${usedPrefix}chatgpt *<text>*_
┣ ඬ⃟ 🛠️ _${usedPrefix}dall-e *<text>*_
┣ ඬ⃟ 🛠️ _${usedPrefix}styletext *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}sticker *<respond a image video>*_
┣ ඬ⃟ 👽 _${usedPrefix}sticker *<link / url>*_
┣ ඬ⃟ 👽 _${usedPrefix}s *<respond a image video>*_
┣ ඬ⃟ 👽 _${usedPrefix}s *<link / url>*_
┣ ඬ⃟ 👽 _${usedPrefix}sfull *<imagen o video>*_
┣ ඬ⃟ 👽 _${usedPrefix}emojimix *<emoji 1>&<emoji 2>*_
┣ ඬ⃟ 👽 _${usedPrefix}scircle *<image>*_
┣ ඬ⃟ 👽 _${usedPrefix}sremovebg *<image>*_
┣ ඬ⃟ 👽 _${usedPrefix}semoji *<tip> <emoji>*_
┣ ඬ⃟ 👽 _${usedPrefix}attp *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}attp2 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}attp3 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}ttp *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}ttp2 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}ttp3 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}ttp4 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}ttp5 *<text>*_
┣ ඬ⃟ 👽 _${usedPrefix}pat *<@tag>*_
┣ ඬ⃟ 👽 _${usedPrefix}slap *<@tag>*_
┣ ඬ⃟ 👽 _${usedPrefix}kiss *<@tag>*_
┣ ඬ⃟ 👽 _${usedPrefix}wm *<packname> <author>*_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`.trim())
handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['list', 'all menu'] 

export default handler
