process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'

import dotenv from 'dotenv'
import { existsSync, readFileSync, readdirSync, unlinkSync, watch } from 'fs'
import { createRequire } from 'module'
import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import * as ws from 'ws'
import processTxtAndSaveCredentials from './lib/makesession.js'
import clearTmp from './lib/tempclear.js'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}
global.gurubot = 'https://www.guruapi.tech/api'

import chalk from 'chalk'
import { spawn } from 'child_process'
import lodash from 'lodash'
import { JSONFile, Low } from 'lowdb'
import NodeCache from 'node-cache'
import { default as Pino, default as pino } from 'pino'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import yargs from 'yargs'
import CloudDBAdapter from './lib/cloudDBAdapter.js'
import { MongoDB } from './lib/mongoDB.js'
import { makeWASocket, protoType, serialize } from './lib/simple.js'

const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestWaWebVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  proto,
  delay,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = await (
  await import('@whiskeysockets/baileys')
).default

import readline from 'readline'

dotenv.config()

async function main() {
  const txt = process.env.SESSION_ID

  if (!txt) {
    console.error('Environment variable not found.')
    return
  }

  try {
    await processTxtAndSaveCredentials(txt)
    console.log('processTxtAndSaveCredentials completed.')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()

await delay(1000 * 10)

async function gandu() {
  try {
    const packageJson = readFileSync('package.json', 'utf8')
    const packageData = JSON.parse(packageJson)
    const gnome = packageData.author && packageData.author.name

    if (!gnome) {
      console.log('LOl')
      process.exit(1)
    }

    const lund = Buffer.from('Z3VydQ==', 'base64').toString()
    const lawde = Buffer.from(
      `Q2hlYXAgQ29weSBPZiBHdXJ1IEJvdCBGb3VuZCAsIFBsZWFzZSBVc2UgdGhlIE9yaWdpbmFsIEd1cnUgQm90IEZyb20gaHR0cHM6Ly9naXRodWIuY29tL0d1cnUzMjIvR1VSVS1CT1QK`,
      'base64'
    ).toString()
    const endi = Buffer.from(
      `U2VjdXJpdHkgY2hlY2sgcGFzc2VkLCBUaGFua3MgRm9yIHVzaW5nIEd1cnUgTXVsdGlEZXZpY2U=`,
      'base64'
    ).toString()

    if (gnome && gnome.trim().toLowerCase() !== lund.toLowerCase()) {
      console.log(lawde)
      process.exit(1)
    } else {
      console.log(`${endi}`)
      console.log(chalk.bgBlack(chalk.redBright('initializing Guru Bot')))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

gandu()

const pairingCode = !!global.pairingNumber || process.argv.includes('--pairing-code')
const useQr = process.argv.includes('--qr')
const useStore = true

const MAIN_LOGGER = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` })

const logger = MAIN_LOGGER.child({})
logger.level = 'fatal'

const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./session.json')

setInterval(() => {
  store?.writeToFile('./session.json')
}, 10000 * 6)

const msgRetryCounterCache = new NodeCache()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const question = text => new Promise(resolve => rl.question(text, resolve))

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name],
              }
            : {}),
        })
      )
    : '')
global.timestamp = {
  start: new Date(),
}

const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp(
  '^[' +
    (process.env.PREFIX || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      '\\$&'
    ) +
    ']'
)
global.opts['db'] = process.env.DATABASE_URL

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '')
    ? new CloudDBAdapter(opts['db'])
    : /mongodb(\+srv)?:\/\//i.test(opts['db'])
      ? new MongoDB(opts['db'])
      : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)

global.DATABASE = global.db

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise(resolve =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this)
          resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
        }
      }, 1 * 1000)
    )
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
    ...(global.db.data || {}),
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()
global.authFolder = `session`
const { state, saveCreds } = await useMultiFileAuthState(global.authFolder)
//let { version, isLatest } = await fetchLatestWaWebVersion()

const connectionOptions = {
  version: [2, 3000, 1015901307],
  logger: Pino({
    level: 'fatal',
  }),
  printQRInTerminal: !pairingCode,
  browser: ['chrome (linux)', '', ''],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      Pino().child({
        level: 'fatal',
        stream: 'store',
      })
    ),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async key => {
    let jid = jidNormalizedUser(key.remoteJid)
    let msg = await store.loadMessage(jid, key.id)
    return msg?.message || ''
  },
  patchMessageBeforeSending: message => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.templateMessage ||
      message.listMessage
    )
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      }
    }

    return message
  },
  msgRetryCounterCache,
  defaultQueryTimeoutMs: undefined,
  syncFullHistory: false,
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false
store?.bind(conn.ev)

if (pairingCode && !conn.authState.creds.registered) {
  let phoneNumber
  if (!!global.pairingNumber) {
    phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '')

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx"))
      )
      process.exit(0)
    }
  } else {
    phoneNumber = await question(
      chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
    )
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx"))
      )

      phoneNumber = await question(
        chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
      )
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
      rl.close()
    }
  }

  setTimeout(async () => {
    let code = await conn.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join('-') || code
    const pairingCode =
      chalk.bold.greenBright('Your Pairing Code:') + ' ' + chalk.bgGreenBright(chalk.black(code))
    console.log(pairingCode)
  }, 3000)
}

conn.logger.info('\nWaiting For Login\n')

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write()
      if (opts['autocleartmp'] && (global.support || {}).find)
        (tmp = [os.tmpdir(), 'tmp']),
          tmp.forEach(filename =>
            cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])
          )
    }, 30 * 1000)
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

function runCleanup() {
  clearTmp()
    .then(() => {
      console.log('Temporary file cleanup completed.')
    })
    .catch(error => {
      console.error('An error occurred during temporary file cleanup:', error)
    })
    .finally(() => {
      // 2 minutes
      setTimeout(runCleanup, 1000 * 60 * 2)
    })
}

runCleanup()

function clearsession() {
  let prekey = []
  const directorio = readdirSync('./session')
  const filesFolderPreKeys = directorio.filter(file => {
    return file.startsWith('pre-key-')
  })
  prekey = [...prekey, ...filesFolderPreKeys]
  filesFolderPreKeys.forEach(files => {
    unlinkSync(`./session/${files}`)
  })
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update
  global.stopped = connection

  if (isNewLogin) conn.isInit = true

  const code =
    lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    try {
      conn.logger.info(await global.reloadHandler(true))
    } catch (error) {
      console.error('Error reloading handler:', error)
    }
  }

  if (code && (code === DisconnectReason.restartRequired || code === 428)) {
    conn.logger.info(chalk.yellow('\n🚩 Restart Required... Restarting'))
    process.send('reset')
  }

  if (global.db.data == null) loadDatabase()

  if (!pairingCode && useQr && qr !== 0 && qr !== undefined) {
    conn.logger.info(chalk.yellow('\nLogging in....'))
  }

  if (connection === 'open') {
    const { jid, name } = conn.user
    const msg = `Hai🤩 ${name}, Congrats you have successfully deployed GURU-BOT\nJoin my support Group for any Query\n https://chat.whatsapp.com/F3sB3pR3tClBvVmlIkqDJp`

    await conn.sendMessage(jid, { text: msg, mentions: [jid] }, { quoted: null })

    conn.logger.info(chalk.yellow('\n🚩 R E A D Y'))
  }

  if (connection === 'close') {
    conn.logger.error(chalk.yellow(`\nConnection closed... Get a new session`))
  }
}

process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (error) {
    console.error
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch {}
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, {
      chats: oldChats,
    })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('messages.update', conn.pollUpdate)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('presence.update', conn.presenceUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = ` Hello @user!\n\n🎉 *WELCOME* to the group @group!\n\n📜 Please read the *DESCRIPTION* @desc.`
  conn.bye = `👋GOODBYE @user \n\nSee you later!`
  conn.spromote = `*@user* has been promoted to an admin!`
  conn.sdemote = `*@user* is no longer an admin.`
  conn.sDesc = `The group description has been updated to:\n@desc`
  conn.sSubject = `The group title has been changed to:\n@group`
  conn.sIcon = `The group icon has been updated!`
  conn.sRevoke = ` The group link has been changed to:\n@revoke`
  conn.sAnnounceOn = `The group is now *CLOSED*!\nOnly admins can send messages.`
  conn.sAnnounceOff = `The group is now *OPEN*!\nAll participants can send messages.`
  conn.sRestrictOn = `Edit Group Info has been restricted to admins only!`
  conn.sRestrictOff = `Edit Group Info is now available to all participants!`

  conn.handler = handler.handler.bind(global.conn)
  conn.pollUpdate = handler.pollUpdate.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.presenceUpdate = handler.presenceUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  const currentDateTime = new Date()
  const messageDateTime = new Date(conn.ev)
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map(v => v[0])
  } else {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map(v => v[0])
  }

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('messages.update', conn.pollUpdate)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('presence.update', conn.presenceUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit()
  .then(_ => Object.keys(global.plugins))
  .catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`\nUpdated plugin - '${filename}'`)
      else {
        conn.logger.warn(`\nDeleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`\nNew plugin - '${filename}'`)
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    })
    if (err) conn.logger.error(`\nSyntax error while loading '${filename}'\n${format(err)}`)
    else {
      try {
        const module = await import(`${global.__filename(dir)}?update=${Date.now()}`)
        global.plugins[filename] = module.default || module
      } catch (e) {
        conn.logger.error(`\nError require plugin '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        )
      }
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
  const test = await Promise.all(
    [
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-filter_complex',
        'color',
        '-frames:v',
        '1',
        '-f',
        'webp',
        '-',
      ]),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version']),
    ].map(p => {
      return Promise.race([
        new Promise(resolve => {
          p.on('close', code => {
            resolve(code !== 127)
          })
        }),
        new Promise(resolve => {
          p.on('error', _ => resolve(false))
        }),
      ])
    })
  )
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  const s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  })
  Object.freeze(global.support)
}

async function saafsafai() {
  if (stopped === 'close' || !conn || !conn.user) return
  clearsession()
  console.log(chalk.cyanBright('\nStored Sessions Cleared'))
}

setInterval(saafsafai, 10 * 60 * 1000)

_quickTest().catch(console.error)
