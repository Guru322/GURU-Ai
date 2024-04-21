let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]


   
    
    if (user.chicken > 0) return m.reply('du hast schon ein huhn')
    if (user.credit < 500) return m.reply(`🟥 *dein huhn wurde in deine waltet hinzugefügt*`)

    user.credit -= 1000
    user.chicken += 1
    m.reply(`🎉 du hast ein hund gekauft nutze den command ${usedPrefix}cock-fight <amount>`)
}

handler.help = ['buych']
handler.tags = ['economy']
handler.command = ['buy', 'buych'] 

handler.group = true

export default handler