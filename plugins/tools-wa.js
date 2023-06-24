import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn, usedPrefix, command}) => {

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
    let user = global.db.data.users[who]
    let username = conn.getName(who)
    let { name,registered } = global.db.data.users[who]

  let message = `
  
   *Name:*  ${username} ${registered ? '\n   • ' + name + ' ': ''}
   *Number:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
   *Link:* wa.me/+${who.split`@`[0]}`;

  conn.sendFile(m.chat, pp, 'pp.jpg', message, m, false, { mentions: [who] })
    m.react(done)
};

handler.help = ['wa'];
handler.tags = ['tools'];
handler.command = ['wa'];

export default handler;
