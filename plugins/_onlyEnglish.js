
let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner } ) {
	
	if (!m.isGroup) return !1
	let chat = global.db.data.chats[m.chat]
	let te = `✳️Only English-speaking people are allowed in this group`
	if (isBotAdmin && chat.onlyenglish && !isAdmin && !isOwner) {
   if (m.sender.startsWith('60')) {
  //global.db.data.users[m.sender].banned = true
 m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('264')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('263')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('212')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('234')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('93')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   if (m.sender.startsWith('94')) {
  m.reply(te, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   } 
   
   //---
}  
}
export default handler
