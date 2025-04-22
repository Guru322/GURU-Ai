import chalk from 'chalk'
import { spawn } from 'child_process'
import express from 'express'
import figlet from 'figlet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

let pairingCode = null
let isConnected = false
let botProcess = null
let botStats = null 
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const phoneNumber = process.env.PHONE_NUMBER || ''

figlet(
  'GURU BOT',
  {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  },
  (err, data) => {
    if (err) {
      console.error(chalk.red('Figlet error:', err))
      return
    }
    console.log(chalk.yellow(data))
  }
)

figlet(
  'Advanced Whatsapp Bot',
  {
    horizontalLayout: 'default',
    verticalLayout: 'default',
  },
  (err, data) => {
    if (err) {
      console.error(chalk.red('Figlet error:', err))
      return
    }
    console.log(chalk.magenta(data))
  }
)

const app = express()
const port = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'Assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Assets', 'guru.html'))
})

app.get('/pairing-status', (req, res) => {
  res.json({
    pairingCode: pairingCode,
    connected: isConnected,
    stats: isConnected ? botStats : null
  })
})

app.get('/bot-stats', (req, res) => {
  if (botStats) {
    res.json(botStats)
  } else {
    requestBotStats()
    res.status(503).json({ error: 'Bot statistics not available yet' })
  }
})

app.listen(port, () => {
  console.log(chalk.green(`Server running on port ${port}`))
  console.log(chalk.cyan('Open your browser and navigate to:'))
  console.log(chalk.yellow(`http://localhost:${port}`))
  
  startBot()
  
  setInterval(requestBotStats, 30000)
})

function startBot() {
  if (botProcess) return

  console.log(chalk.blue('Starting GURU Bot with:'))
  console.log(chalk.blue(`MongoDB URI: ${mongodbUri}`))
  console.log(chalk.blue(`Phone number: ${phoneNumber || 'Not specified'}`))

  if (!mongodbUri) {
    console.error(chalk.red('MONGODB_URI environment variable is required!'))
    return
  }

  if (!phoneNumber) {
    console.warn(chalk.yellow('PHONE_NUMBER environment variable is not set. You may need to enter it manually.'))
  }

  const currentFilePath = new URL(import.meta.url).pathname
  const args = [path.join(path.dirname(currentFilePath), 'Guru.js'), ...process.argv.slice(2)]
  
  const env = {
    ...process.env,
    MONGODB_URI: mongodbUri,
    PHONE_NUMBER: phoneNumber,
    PAIRING_MODE: 'true'
  }
  
  botProcess = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    env
  })

  botProcess.on('message', data => {
    console.log(chalk.cyan(`✔️RECEIVED ${JSON.stringify(data)}`))
    
    if (typeof data === 'object' && data.type === 'pairing-code') {
      pairingCode = data.code
      console.log(chalk.green(`Pairing code received: ${pairingCode}`))
    } else if (typeof data === 'object' && data.type === 'connection-status') {
      isConnected = data.connected
      console.log(chalk.green(`Connection status: ${isConnected ? 'Connected' : 'Disconnected'}`))
    } else if (typeof data === 'object' && data.type === 'stats') {
      botStats = data.stats
      console.log(chalk.green(`Bot statistics updated`))
    } else {
      switch (data) {
        case 'reset':
          botProcess.kill()
          botProcess = null
          startBot()
          break
        case 'uptime':
          botProcess.send(process.uptime())
          break
      }
    }
  })

  botProcess.on('exit', code => {
    botProcess = null
    console.error(chalk.red(`❌Bot exited with code: ${code}`))

    if (code === 0) return

    setTimeout(() => {
      console.log(chalk.yellow('Attempting to restart bot...'))
      startBot()
    }, 5000)
  })

  botProcess.on('error', err => {
    console.error(chalk.red(`Error: ${err}`))
    botProcess.kill()
    botProcess = null
    
    setTimeout(() => {
      console.log(chalk.yellow('Attempting to restart bot after error...'))
      startBot()
    }, 5000)
  })
}

function requestBotStats() {
  if (botProcess && isConnected) {
    botProcess.send({ type: 'request-stats' })
  }
}

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red(`Unhandled promise rejection: ${reason}`))
  console.error(chalk.red(`Bot will restart...`))
  if (botProcess) {
    botProcess.kill()
    botProcess = null
  }
  startBot()
})

process.on('exit', code => {
  console.error(chalk.red(`Exiting with code: ${code}`))
  if (botProcess) {
    botProcess.kill()
  }
})
