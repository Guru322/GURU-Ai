let handler = async (m, { conn, isAdmin, isBotAdmin, participants }) => {
  if (!isAdmin) throw 'Nur Gruppenadministratoren können diesen Befehl verwenden!';
  if (!isBotAdmin) throw 'Ich muss ein Gruppenadministrator sein, um diesen Befehl auszuführen!';

  let kickParticipants = participants.filter(member => !member.admin && member.id !== m.sender && !member.isAdmin).map(member => member.id);

  if (kickParticipants.length === 0) {
      return m.reply('Keine Teilnehmer zum Entfernen gefunden.');
  }

  for (let user of kickParticipants) {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
  }

  m.reply(`✅ ${kickParticipants.length} Mitglieder wurden aus der Gruppe entfernt.`);
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall'];
handler.admin = true;
handler.botAdmin = true;

export default handler;