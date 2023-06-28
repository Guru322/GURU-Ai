let confirm = {}

async function handler(m, { conn, args }) {
  // Check if the user is already in a gamble.
  if (m.sender in confirm) {
    throw 'You are still in a gamble. Please wait until it is finished.'
  }

  try {
    let user = global.db.data.users[m.sender]
    let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(user.money) : 1) * 1

    // Limiting the maximum bet amount to 10000.
    if (count > 10000) {
      count = 10000
    }

    if (user.money < count) {
      return m.reply('💹 You do not have enough money for this bet.')
    }

    if (!(m.sender in confirm)) {
      confirm[m.sender] = {
        sender: m.sender,
        count,
        timeout: setTimeout(() => (m.reply('Bet timed out.'), delete confirm[m.sender]), 60000)
      }

      let txt = `Are you sure you want to place this bet? Respond with 'yes' or 'no'. \n\nBet Amount: ${count} 💹\nYou have 60 seconds to respond.`
      return conn.sendMessage(m.chat, { text: txt, quoted: m, contextInfo: { mentionedJid: [m.sender] } });
    }
  } catch (e) {
    console.error(e)
    if (m.sender in confirm) {
      let { timeout } = confirm[m.sender]
      clearTimeout(timeout)
      delete confirm[m.sender]
      m.reply('Bet cancelled due to an error.')
    }
  }
}

handler.before = async m => {
  if (!(m.sender in confirm)) return
  if (m.isBaileys) return

  let { timeout, count } = confirm[m.sender]
  let user = global.db.data.users[m.sender]
  let initialMoney = user.money * 1
  let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()

  try {
    if (/^(✔️|y(es|a))?$/i.test(txt)) {
      let botScore = (Math.ceil(Math.random() * 51)) * 1  // Random score for the bot (1 to 51)
      let playerScore = (Math.floor(Math.random() * 101)) * 1  // Random score for the player (1 to 100)
      let status = 'lost'

      if (botScore < playerScore) {
        user.money += count * 1
        status = 'won'
      } else if (botScore > playerScore) {
        user.money -= count * 1
      } else {
        status = 'draw'
        user.money += Math.floor(count / 1.5) * 1
      }

      let result = `
      | *Players* | *Points* |
      * Bot:*      ${botScore}
      * You:*    ${playerScore}
      You *${status}*. Your new balance: ${user.money} 💹
          `.trim()

      m.reply(result)
      clearTimeout(timeout)
      delete confirm[m.sender]
      return true
    } else if (/^(✖️|no)?$/i.test(txt)) {
      clearTimeout(timeout)
      delete confirm[m.sender]
      m.reply('Bet cancelled.')
      return true
    }

  } catch (e) {
    clearTimeout(timeout)
    delete confirm[m.sender]

    // If money was lost due to an error, restore it.
    if (initialMoney > user.money) user.money = initialMoney

    m.reply('Bet cancelled due to an error.')
    return true
  } finally {
    clearTimeout(timeout)
    delete confirm[m.sender]
    return true
  }
}

handler.help = ['bet [amount]']
handler.tags = ['rpg']
handler.command = /^(bet)$/i

export default handler

/**
 * Detect if the input is a number
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}
