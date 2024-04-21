let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let currentTime = new Date().getTime();
    let lastTime = user.lastcasino || 0;
    let diffTime = currentTime - lastTime;
    let waitTime = 5 * 60 * 60 * 1000; // 5 Stunden in Millisekunden
    
    // Überprüfen, ob der Benutzer genügend Zeit gewartet hat
    if (diffTime < waitTime) {
      let remainingTime = waitTime - diffTime;
      let remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
      let remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      let remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
      m.reply(`Du kannst das Casino erst in ${remainingHours} Stunden, ${remainingMinutes} Minuten und ${remainingSeconds} Sekunden erneut verwenden. ⏳`);
      return;
    }
  
    // Überprüfen, ob der Benutzer genügend Gold hat
    if (user.credit < 50) {
      m.reply(`Du hast nicht genügend Gold, um am Casino teilzunehmen. Der Einsatz beträgt 50 Gold. ❌`);
      return;
    }
  
    let betAmount = 50;
    let winAmount = Math.random() < 0.8 ? 0 : Math.floor(Math.random() * 10001); // 80% Chance, dass der Benutzer kein Gold gewinnt
  
    // Gold abziehen
    user.credit -= betAmount;
  
    if (winAmount === 0) {
      m.reply(`Oh nein! Du hast beim Casino verloren. Du erhältst kein Gold. ❌`);
    } else {
      user.credit += winAmount;
      m.reply(`🎉 Herzlichen Glückwunsch! Du hast beim Casino gewonnen und erhältst ${winAmount} Gold. ✅`);
    }
  
    // Zeitstempel aktualisieren
    user.lastcasino = currentTime;
  };
  handler.help = ['casino'];
  handler.tags = ['Wirtschaft'];
  handler.command = ['casino']; 
  handler.register = true;
  export default handler;