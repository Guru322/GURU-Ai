import fetch from 'node-fetch'
import { sticker, addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'
let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `*[❗] where is the text*\n\n*—◉ 𝙴xample:*\n*◉ ${usedPrefix + command} Guru*`
let teks = encodeURI(text)

if (command == 'attp') {
let a1 = await (await fetch(`https://api.erdwpe.com/api/maker/attp?text=${teks}`)).buffer()
let a2 = await createSticker(a1, false, global.packname, global.author)
conn.sendFile(m.chat, a2, 'sticker.webp', '', m, { asSticker: true })}

if (command == 'attp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'attp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp2?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}

if (command == 'ttp5') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp6?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp4') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp5?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp3?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp2?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
}
handler.command = handler.help = ['ttp', 'ttp2', 'ttp3', 'ttp4', 'ttp5', 'attp', 'attp2', 'attp3']
handler.tags = ['sticker']
export default handler

async function createSticker(img, url, packName, authorName, quality) {
let stickerMetadata = { type: 'full', pack: packName, author: authorName, quality }
return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()}
async function mp4ToWebp(file, stickerMetadata) {
if (stickerMetadata) {
if (!stickerMetadata.pack) stickerMetadata.pack = '‎'
if (!stickerMetadata.author) stickerMetadata.author = '‎'
if (!stickerMetadata.crop) stickerMetadata.crop = false
} else if (!stickerMetadata) { stickerMetadata = { pack: '‎', author: '‎', crop: false }}
let getBase64 = file.toString('base64')
const Format = { file: `data:video/mp4;base64,${getBase64}`, processOptions: { crop: stickerMetadata?.crop, startTime: '00:00:00.0', endTime: '00:00:7.0', loop: 0
}, stickerMetadata: { ...stickerMetadata },
sessionInfo: {
WA_VERSION: '2.2106.5',
PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',
BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',
OS: 'Windows Server 2016',
START_TS: 1614310326309,
NUM: '6247',
LAUNCH_TIME_MS: 7934,
PHONE_VERSION: '2.20.205.16'
},
config: {
sessionId: 'session',
headless: true,
qrTimeout: 20,
authTimeout: 0,
cacheEnabled: false,
useChrome: true,
killProcessOnBrowserClose: true,
throwErrorOnTosBlock: false,
chromiumArgs: [
'--no-sandbox',
'--disable-setuid-sandbox',
'--aggressive-cache-discard',
'--disable-cache',
'--disable-application-cache',
'--disable-offline-load-stale-cache',
'--disk-cache-size=0'
],
executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
skipBrokenMethodsCheck: true,
stickerServerEndpoint: true
}}
let res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', { method: 'post', headers: { Accept: 'application/json, text/plain, /', 'Content-Type': 'application/json;charset=utf-8', }, body: JSON.stringify(Format)})
return Buffer.from((await res.text()).split(';base64,')[1], 'base64')}
