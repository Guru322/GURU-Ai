 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import './config.js'; 
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk'
import syntaxerror from 'syntax-error';
import writeSessionToCreds from './sessions.js';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import pino from 'pino';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js'
import dotenv from 'dotenv';
import {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion 
   } from '@whiskeysockets/baileys'
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) } 

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
dotenv.config();


global.opts['db'] = process.env.MONGODB;


global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)


global.DATABASE = global.db 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

writeSessionToCreds(__dirname);


//-- SESSION
global.authFolder = `sessions`
const { state, saveCreds } = await useMultiFileAuthState(global.authFolder)
let { version, isLatest } = await fetchLatestBaileysVersion() 
console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
const connectionOptions = {
  version,
    printQRInTerminal: true,
    auth: state,
    browser: ['GURU-V2', 'Safari', '3.1.0'], 
  logger: pino({ level: 'silent' }),
  markOnlineOnConnect: true, 
  generateHighQualityLinkPreview: true,
  defaultQueryTimeoutMs: undefined
} 

//--
global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()

    } catch (e) { console.error(e) }
  }, 60 * 1000)
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

/* Clear */
function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, './tmp')];
    const filename = [];
    const allowedExtensions = [
      '.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm',
      '.mp3', '.wav', '.flac', '.ogg', '.aac', '.wma',
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp',
      '.svg', '.ico', '.tif', '.tiff',
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.bin' 
      // Add more extensions as needed
    ];
    
  
    tmp.forEach((dirname) => {
      const files = readdirSync(dirname);
      files.forEach((file) => filename.push(join(dirname, file)));
    });
  
    return filename.map((file) => {
      const stats = statSync(file);
      const extension = file.slice(file.lastIndexOf('.'));
      
      if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 1) && allowedExtensions.includes(extension)) {
        try {
          unlinkSync(file);
          return true; // File was deleted
        } catch (error) {
          console.error(`Error deleting ${file}: ${error}`);
          return false; // File could not be deleted
        }
      }
      
      return false; // File doesn't meet conditions
    });
  }
  
  const interval = setInterval(() => {
    if (stopped === 'close') {
      clearInterval(interval); // Stop the interval
      return;
    }
  
    try {
      const deletedFiles = clearTmp();
      console.log(chalk.cyanBright(`Auto clear Temp folder cleared. Deleted ${deletedFiles.filter(Boolean).length} files.`));
    } catch (error) {
      console.error(`Auto clear Temp folder error: ${error}`);
    }
  }, 60000); // Set interval to 1 minute

  async function connectionUpdate(update) {
    const {connection, lastDisconnect, isOnline, receivedPendingNotifications, isNewLogin} = update;
    global.stopped = connection;
    if (isNewLogin) conn.isInit = true;
   if (isOnline == true) console.log(chalk.green('BOT ACTIVE'))
  if (isOnline == false) console.log(chalk.red('BOT OFF'))
  if (receivedPendingNotifications) console.log(chalk.yellow('Waiting for New Messages'))
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
      console.log(await global.reloadHandler(true).catch(console.error));
      global.timestamp.connect = new Date;
    }
    if (global.db.data == null) loadDatabase();
    if (update.qr != 0 && update.qr != undefined) {
      console.log(chalk.yellow('🚩ᅠScan this QR code, the QR code expires in 60 seconds.'));
    }
    if (connection == 'open') {
      console.log(chalk.yellow('CONNECTED CORRECTLY TO WHATSAPP'));
    }
    if (connection == 'close') {
      console.log(chalk.yellow(`🚩ᅠConnection closed, please delete the ${global.authFile} folder and rescan the QR code`));
    }
  }
  
  process.on('uncaughtException', console.error);
  // conn.ev.on('messages.update', console.log);
  
  let isInit = true;
  let handler = await import('./handler.js');
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.welcome = '*@user Welcome to the Group';
  conn.bye = '*@user SEE YOU SOON*';
  conn.spromote = '*@user JOINS THE ADMIN GROUP!!*';
  conn.sdemote = '*@user LEAVES THE ADMIN GROUP !!*'; 
  conn.sDesc = '*THE GROUP DESCRIPTION HAS BEEN MODIFIED*\n\n*NEW DESCRIPTION:* @desc';
  conn.sSubject = '*THE GROUP NAME HAS BEEN MODIFIED*\n*NEW NAME:* @subject';
  conn.sIcon = '*THE GROUP PHOTO HAS BEEN CHANGED!!*';
  conn.sRevoke = '*THE GROUP LINK HAS BEEN UPDATED!!*\n*NEW LINK:* @revoke';

  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`New plugin - '${filename}'`)
      else {
        conn.logger.warn(`Deleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`New plugin - '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('✅ Quick test Done'))
  .catch(console.error)
