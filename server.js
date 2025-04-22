import express from 'express'
import { createServer } from 'http'
import path from 'path'
import { toBuffer } from 'qrcode'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import rateLimit from 'express-rate-limit'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function connect(conn, PORT) {
  let app = (global.app = express())
  let server = (global.server = createServer(app))
  let _qr = 'invalid'
  
  if (!global.pairingCode) global.pairingCode = null
  
  app.use('/assets', express.static(path.join(__dirname, 'Assets')))

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })

  app.get('/', limiter, (req, res) => {
    res.sendFile(path.join(__dirname, 'Assets', 'guru.html'))
  })

  app.get('/pairing-status', (req, res) => {
    const isConnected = conn.user != null
    
    res.json({
      pairingCode: global.pairingCode,
      connected: isConnected,
      stats: isConnected ? generateStatsFromDatabase() : null
    })
  })

  app.get('/bot-stats', (req, res) => {
    try {
      const stats = generateStatsFromDatabase()
      res.json(stats)
    } catch (error) {
      console.error('Error generating stats:', error)
      res.status(500).json({ error: 'Failed to generate statistics' })
    }
  })

  app.get('/qr', async (req, res) => {
    res.setHeader('content-type', 'image/png')
    res.end(await toBuffer(_qr))
  })

  conn.ev.on('connection.update', function updateConnectionState(update) {
    const { connection, qr } = update
    if (qr) _qr = qr
  })

  server.listen(PORT, () => {
    console.log('Web server running on port', PORT)
    if (opts['keepalive']) keepAlive()
  })
  
  return {
    app,
    server
  }
}

function generateStatsFromDatabase() {
  try {
    if (!global.db?.data) {
      return { error: 'Database not loaded' }
    }
    
    const stats = {
      users: Object.keys(global.db.data.users || {}).length,
      groups: Object.keys(global.db.data.chats || {}).filter(id => id.endsWith('@g.us')).length,
      privateChats: Object.keys(global.db.data.chats || {}).filter(id => !id.endsWith('@g.us')).length,
      totalChats: Object.keys(global.db.data.chats || {}).length,
      settings: Object.keys(global.db.data.settings || {}).length,
      plugins: Object.keys(global.plugins || {}).length,
      uptime: formatUptime(process.uptime()),
      memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      bannedUsers: Object.values(global.db.data.users || {}).filter(user => user.banned).length,
      activeGroups: Object.values(global.db.data.chats || {}).filter(chat => !chat.isBanned && chat.id?.endsWith('@g.us')).length,
      registeredUsers: Object.values(global.db.data.users || {}).filter(user => user.registered).length,
    }
    
    if (global.db.data.stats) {
      const pluginStats = global.db.data.stats
      const topPlugins = Object.entries(pluginStats)
        .map(([name, stat]) => ({ name, total: stat.total || 0 }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
      
      stats.topPlugins = topPlugins
    }
    
    return stats
  } catch (error) {
    console.error('Error generating statistics:', error)
    return { error: 'Failed to generate statistics' }
  }
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  let result = ''
  if (days > 0) result += `${days}d `
  if (hours > 0) result += `${hours}h `
  result += `${minutes}m`
  
  return result
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  if (/(\/\/|\.)undefined\./.test(url)) return
  setInterval(
    () => {
      fetch(url).catch(console.error)
    },
    5 * 1000 * 60
  )
}

export default connect
