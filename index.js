import chalk from 'chalk'
import { spawn } from 'child_process'
import express from 'express'
import figlet from 'figlet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'Assets')));

app.get('/', (req, res) => {
  res.redirect('/guru.html');
});

app.listen(port, () => {
  console.log(chalk.green(`Port ${port} is open`))
})

let isRunning = false

async function start(file) {
  if (isRunning) return
  isRunning = true

  const currentFilePath = new URL(import.meta.url).pathname
  const args = [path.join(path.dirname(currentFilePath), file), ...process.argv.slice(2)]
  const p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  })

  p.on('message', data => {
    console.log(chalk.cyan(`✔️RECEIVED ${data}`))
    switch (data) {
      case 'reset':
        p.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })

  p.on('exit', code => {
    isRunning = false
    console.error(chalk.red(`❌Exited with code: ${code}`))

    if (code === 0) return

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start('Guru.js')
    })
  })

  p.on('error', err => {
    console.error(chalk.red(`Error: ${err}`))
    p.kill()
    isRunning = false
    start('Guru.js')
  })

  const pluginsFolder = path.join(path.dirname(currentFilePath), 'plugins')

  fs.readdir(pluginsFolder, async (err, files) => {
    if (err) {
      console.error(chalk.red(`Error reading plugins folder: ${err}`))
      return
    }
    console.log(chalk.yellow(`Installed ${files.length} plugins`))

    try {
      const { default: baileys } = await import('@whiskeysockets/baileys')
      const version = (await baileys.fetchLatestBaileysVersion()).version
      console.log(chalk.yellow(`Using Baileys version ${version}`))
    } catch (e) {
      console.error(chalk.red(' Baileys library is not installed'))
    }
  })
}

start('Guru.js')

process.on('unhandledRejection', () => {
  console.error(chalk.red(`Unhandled promise rejection. Bot will restart...`))
  start('Guru.js')
})

process.on('exit', code => {
  console.error(chalk.red(`Exited with code: ${code}`))
  console.error(chalk.red(`Bot will restart...`))
  start('Guru.js')
})
