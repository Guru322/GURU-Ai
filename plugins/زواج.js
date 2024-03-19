let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`*${toM(a)}, الف مبروك للعريس🥳✨*
*${toM(b)}, الف مبروك للعروسه🥳✨*\n\*ملاحظه ده منشن عشوائي للمرح فقط اذ لم يعجبك الأمر إذن ماتستخدمش الامر💗*`, null, {
mentions: [a, b]
})}
handler.help = ['formarpareja']
handler.tags = ['main', 'fun']
handler.command = ['formarpareja','زواج']
handler.group = true
export default handler
