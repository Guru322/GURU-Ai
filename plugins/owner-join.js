let handler = async (m, { conn, text, usedPrefix, command, args, participants }) => {
  let time = global.db.data.users[m.sender].lastjoin + 86400000;
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
  let delay = time => new Promise(res => setTimeout(res, time));

  let name = m.sender; 
  let [_, code] = text.match(linkRegex) || [];
  if (!args[0]) throw `✳️ Sende den Gruppenlink\n\n 📌 Beispiel:\n *${usedPrefix + command}* <linkwa> <tage>\n\n_die Zahl gibt die Tage an, die der Bot in der Gruppe bleiben wird_`; 
  if (!code) throw `✳️ Ungültiger Link`;
  if (!args[1]) throw `📌 Anzahl der Tage fehlt\n\n Beispiel:\n *${usedPrefix + command}* <linkwa> 2`;
  if (isNaN(args[1])) throw `✳️ Nur Zahlen, die die Tage darstellen, die der Bot in der Gruppe bleiben wird!`;
  let owbot = global.owner[1]; 
  m.reply(`😎 Warte 3 Sekunden, ich trete der Gruppe bei`);
  await delay(3000);
  try {
    let res = await conn.groupAcceptInvite(code);
    let b = await conn.groupMetadata(res);
    let d = b.participants.map(v => v.id);
    let member = d.toString();
    let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'));
    let nDays = 86400000 * args[1];  
    let now = new Date() * 1;
    if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays;
    else global.db.data.chats[res].expired = now + nDays;
    await conn.reply(res, `🏮 Hallo Leute\n\nIch wurde von @${m.sender.split('@')[0]} eingeladen, um in der Gruppe zu helfen. Bitte geben Sie mir zuerst Admin-Rechte.`, m, {
      mentions: d
    });

    if (e.length) await m.reply(`✅ Ich bin erfolgreich der Gruppe beigetreten \n\n≡ Gruppeninfo \n\n *Name :* ${await conn.getName(res)}\n\nDer Bot wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`);
 
    if (e.length) await conn.reply(res, `🏮 Hallo Leute\n\n@${owbot} ist mein Ersteller, wenn ihr Fragen habt.\nIch wurde von *${m.name}* eingeladen`, m, {
      mentions: d
    }).then(async () => {
      await delay(7000);
    }).then(async () => {
      await conn.reply(res, `Ok, alle entspannen sich 🤭`, 0);
      await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *GRUPPENEINLADUNG*\n\n@${m.sender.split('@')[0]} hat *${conn.user.name}* in die Gruppe eingeladen\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Link : ${args[0]}\n\nDer Bot wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`, null, {mentions: [m.sender]});
    });

    if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *GRUPPENEINLADUNG*\n\n@${m.sender.split('@')[0]} hat *${conn.user.name}* in die Gruppe eingeladen\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Link : ${args[0]}\n\nDer Bot wird automatisch nach\n\n ${msToDate(global.db.data.chats[res].expired - now)} austreten`, null, {mentions: [m.sender]});
    
    if (!e.length) await m.reply(`✳️ Bot erfolgreich in die Gruppe eingeladen\n\n${await conn.getName(res)}\n\nDer Bot wird automatisch nach *${msToDate(global.db.data.chats[res].expired - now)}* austreten`).then(async () => {
      let mes = `Hallo 👋🏻\n\n*${conn.user.name}* ist ein Multi-Device WhatsApp Bot gebaut mit Node.js, *${conn.user.name}* wurde gerade von *${m.name}* eingeladen\n\nUm das Menü des Bots zu sehen, schreibe\n\n${usedPrefix}help\n@${conn.user.jid.split('@')[0]} wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`;
      await conn.sendMessage(m.chat, mes, m, {
        mentions: d
      });
    });

    // Sende eine private Nachricht an den Benutzer, der den Bot eingeladen hat
    await conn.sendMessage(m.sender, `✅ Du hast den Bot erfolgreich in die Gruppe eingeladen: ${await conn.getName(res)}.\n\nDer Bot wird automatisch nach ${msToDate(global.db.data.chats[res].expired - now)} austreten.`, {});

  } catch (e) {
    conn.reply(global.owner[1]+'@s.whatsapp.net', e);
    throw `✳️ Entschuldigung, der Bot konnte der Gruppe nicht beitreten`;
  }
};

handler.help = ['join <chat.whatsapp.com> <tage>'];
handler.tags = ['general'];
handler.command = ['join', 'invite']; 

export default handler;

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, ' *Tage*\n ', h, ' *Stunden*\n ', m, ' *Minuten*\n ', s, ' *Sekunden* '].map(v => v.toString().padStart(2, 0)).join('');
}
