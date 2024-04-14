let rouletteBets = {} // Object to store all the bets
let rouletteResult = {} // Object to store the result

const handler = async (m, { conn, args, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
        return conn.reply(m.chat, 'You must be at least level 5 to use this command.', m);
    }*/

  const resolveRoulette = (chatId, conn) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender
    let username = conn.getName(who)
    if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

    if (rouletteBets[chatId] && rouletteBets[chatId].length > 0) {
      let colores = ['red', 'black']
      let colour = colores[Math.floor(Math.random() * colores.length)]

      let winners = []
      let resultMessage = `The ball landed on ${colour}\n\n🎉 Winners 🎉\n\n`

      for (let bet of rouletteBets[chatId]) {
        let result = ''
        if (colour === bet.color) {
          result = `@${bet.user.split('@')[0]} won ${bet.amount}`
          global.db.data.users[bet.user].credit += bet.amount
          winners.push(result)
        } else {
          result = `@${bet.user.split('@')[0]} lost ${bet.amount}`
          global.db.data.users[bet.user].credit -= bet.amount
        }
      }

      resultMessage += winners.join('\n')
      if (winners.length === 0) {
        resultMessage += 'No winners'
      }

      rouletteResult[chatId] = resultMessage
      delete rouletteBets[chatId]

      //conn.sendFile(m.chat, pp, 'gamble.jpg', resultMessage, m, false, { mentions: [who] })
      conn.reply(m.chat, resultMessage, m, { mentions: [who] })
      //m.reply(resultMessage)
    }
  }

  const runRoulette = (chatId, conn) => {
    const delay = 10 * 1000 // 30 seconds

    setTimeout(() => {
      resolveRoulette(chatId, conn)
    }, delay)
  }

  const betRoulette = (user, chatId, amount, color) => {
    let colores = ['red', 'black']
    if (isNaN(amount) || amount < 500) {
      throw `✳️ The minimum bet is 500 gold`
    }
    if (!colores.includes(color)) {
      throw '✳️ You must specify a valid color: red or black'
    }
    if (users.credit < amount) {
      throw '✳️ You do not have enough gold!'
    }
    if (amount > 100000) {
      throw `🟥 You can't bet gold more than 100000`
    }

    if (!rouletteBets[chatId]) {
      rouletteBets[chatId] = []
    }
    rouletteBets[chatId].push({ user, amount, color })
    return `✅ Your bet of ${amount} gold on ${color} has been placed!`
  }

  //const handler = async (m, { conn, args, usedPrefix, command }) => {
  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2) {
    throw `✳️ Command Usage: ${usedPrefix + command} <amount> <color>\n\n Example: ${usedPrefix + command} 500 red`
  }

  let users = global.db.data.users[m.sender]
  let response = betRoulette(m.sender, m.chat, amount, color)

  m.reply(response)
  runRoulette(m.chat, conn)
}

handler.help = ['gamble <amount> <color(red/black)>']
handler.tags = ['economy']
handler.command = ['gamble']

handler.group = true

export default handler
