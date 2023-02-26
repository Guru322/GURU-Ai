let confirm = {}

async function handler(m, { conn, args }) {
    //if (!isROwner) throw 'Dalam perbaikan'
    if (m.sender in confirm) throw 'You are still gambling, wait for it to finish!!'
    try {
        let user = global.db.data.users[m.sender]
        let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1
        if ((user.money * 1) < count) return m.reply('💹 Your money is not enough!!')
        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                count,
                timeout: setTimeout(() => (m.reply('timed out'), delete confirm[m.sender]), 60000)
            }
            let txt = `Are you sure you want to gamble (Y/n)\n\n*
            Bet:* ${count} 💹\n⏰ 60s Timeout`
            return conn.sendButton(m.chat, txt, author, null, [['✔️'], ['✖️']], m)
        }
    } catch (e) {
        console.error(e)
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
        }
    }
}

handler.before = async m => {
    if (!(m.sender in confirm)) return
    if (m.isBaileys) return
    let { timeout, count } = confirm[m.sender]
    let user = global.db.data.users[m.sender]
    let moneyDulu = user.money * 1
    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()
    try {
        if (/^(✔️|y(es|a))?$/i.test(txt)) {
            let Bot = (Math.ceil(Math.random() * 91)) * 1
            let you = (Math.floor(Math.random() * 71)) * 1
            let status = 'lost'
            if (Bot < you) {
                user.money += count * 1
                status = 'win'
            } else if (Bot > you) {
                user.money -= count * 1
            } else {
                status = 'seri'
                user.money += (Math.floor(count / 1.5)) * 1
            }
            m.reply(`
            | *PLAYERS* | *POINT* |
            * BOT:*      ${Bot}
            * YOU:*    ${you}
            You *${status}*, You ${status == 'win' ? `get *+${count * 2}*` : status == 'lost' ? `loss *-${count * 1}*` : `get *+${Math.floor(count / 1.5)}*`} Money 💹
                `.trim())
            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
        } else if (/^(✖️|no)?$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
            return !0
        }

    } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        if (moneyDulu > (user.money * 1)) user.money = moneyDulu * 1
        m.reply('Error while betting (Rejected)')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}

handler.help = ['judi [jumlah]']
handler.tags = ['rpg']
handler.command = /^(judi|bet)$/i

export default handler

/**
 * Detect if thats number
 * @param {Number} x 
 * @returns Boolean
 */
function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}
