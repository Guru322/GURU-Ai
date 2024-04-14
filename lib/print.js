import chalk from 'chalk'
import { watchFile } from 'fs'

const terminalImage = global.opts['img'] ? require('terminal-image') : ''
const urlRegex = (await import('url-regex-safe')).default({ strict: false })

const log = (text, error = false) =>
  console.log(
    chalk[error ? 'red' : 'blue']('[GURU BOT]'),
    chalk[error ? 'redBright' : 'greenBright'](text)
  )

export default async function (m, conn = { user: {} }) {
  let senderName = await conn.getName(m.sender)

  let chatName = ''
  if (m.chat && m.chat !== m.sender) {
    if (!m.chat.endsWith('@g.us')) {
      chatName = 'Private'
    } else {
      chatName = await conn.getName(m.chat)
      chatName = chatName ? `${chatName} ` : ''
    }
  } else {
    chatName = 'Private'
  }

  if (m.isCommand) {
    let commandText = m.text.split(' ')[0]
    const cmdtxt = chalk.cyanBright('Command')
    const cmd = chalk.yellowBright(`${commandText}`)
    const from = chalk.greenBright('from')
    const username = chalk.yellowBright(`${senderName}`)
    const ins = chalk.greenBright('in')
    const grp = chalk.blueBright(chatName)
    log(`${cmdtxt} ${cmd} ${from} ${username} ${ins} ${grp}`)
  } else {
    const msg = chalk.cyanBright('Message')
    const from = chalk.greenBright('from')
    const username = chalk.yellowBright(`${senderName}`)
    const ins = chalk.greenBright('in')
    const grp = chalk.blueBright(chatName)
    log(`${msg} ${from} ${username} ${ins} ${grp}`)
  }
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
  log(chalk.redBright("Update 'lib/print.js'"), false)
})
