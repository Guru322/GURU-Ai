//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

	text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }

  if(!text && !m.quoted) return conn.reply(`*❏USER RESET*\n\nTag the user, type the number or reply to the message of the user you want to RESET`, m)
  //let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*The number is not registered in WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `*❏ USER RESET*\n\nThe number you entered is invalid`, m)
 // if(number.length > 8) return conn.reply(m.chat, `*❏ USER RESET*\n\nThe number you entered is invalid!`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
  
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
  let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == user) : {}
	let number = user.split('@')[0]
  
	delete global.global.db.data.users[user]
 	
 	conn.reply(m.chat, `*❏ USER RESET*\n\n✅ Rebooted to @${number} from the *DATABASE*`, null, { mentions: [user] })

 
 }
}
handler.help = ['reset <54xxx>']
handler.tags = ['owner']
handler.command = ['reset'] 
handler.admin = false
handler.rowner = true

export default handler
