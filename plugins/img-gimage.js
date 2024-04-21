const starterGold = 50;
const free = 2000;

let handler = async (m, { conn, isOwner }) => {
  let user = global.db.data.users[m.sender];
  
  // Überprüfen, ob der Benutzer der Eigentümer des Bots ist
  if (isOwner) {
    // Gold hinzufügen
    user.credit += starterGold;

    // Starterpaket als beansprucht markieren
    user.starterPackClaimed = true;

    // Zeitstempel setzen, wann das Starterpaket erhalten wurde
    user.starterPackClaimedTime = Date.now();
    
    m.reply(`🎁 Du hast das Starterpaket erfolgreich erhalten:\n- ${starterGold} Gold`);
    return;
  }
  
  // Überprüfen, ob der Benutzer bereits das Starterpaket erhalten hat
  if (user.starterPackClaimed) {
    let claimedTime = new Date(user.starterPackClaimedTime);
    m.reply(`Du hast bereits das Starterpaket erhalten am ${claimedTime.toLocaleString()} von ${m.sender}.\nDein damaliges Profilbild:`);
    conn.sendProfilePicture(m.chat, user.imgUrl || 'https://telegra.ph/file/a488eabf2c2fd4cf3dc49.jpg', '📷 Hier ist dein damaliges Profilbild');
    return;
  }

  // Gold hinzufügen
  user.credit += starterGold;

  // Antwortnachricht
  m.reply(`🎁 Herzlichen Glückwunsch! Du hast das Starterpaket erhalten:\n- ${starterGold} Gold`);

  // Starterpaket als beansprucht markieren
  user.starterPackClaimed = true;

  // Zeitstempel setzen, wann das Starterpaket erhalten wurde
  user.starterPackClaimedTime = Date.now();
};
handler.help = ['starter'];
handler.tags = ['economy'];
handler.command = ['starter']; 
handler.register = true;
export default handler;