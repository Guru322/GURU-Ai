let handler = async (m, { conn, args, usedPrefix }) => {
    try {
        // Stellen Sie sicher, dass auf eine zitierte Nachricht geantwortet wurde
        if (!m.quoted) throw `Antworte auf die Nachricht, die du löschen möchtest.`;

        // Extrahiere die Benutzer-ID der zitierten Nachricht
        let userJid = m.quoted.sender;
        if (!userJid) throw `Benutzer-ID konnte nicht abgerufen werden.`;

        // Analysiere die Dauer aus den Befehlsargumenten
        let duration = parseInt(args[0]);
        if (isNaN(duration) || duration < 5 || duration > 60) {
            throw `Die Dauer sollte zwischen 5 und 60 Minuten liegen.`;
        }

        // Berechne den Zeitstempel, bis zu dem Nachrichten gelöscht werden sollen
        let deleteUntil = Date.now() + duration * 60000; // Umrechnung von Minuten in Millisekunden

        // Funktion zum tatsächlichen Löschen der Nachrichten
        let deleteMessages = async () => {
            try {
                let messages = await conn.loadMessages(m.chat, 25); // Lade die letzten 25 Nachrichten im Chat
                for (let msg of messages) {
                    if (msg.key.fromMe === false && msg.key.participant === userJid) {
                        await conn.deleteMessage(m.chat, msg.key);
                    }
                }
            } catch (error) {
                throw `Fehler beim Löschen der Nachrichten: ${error}`;
            }
        };

        // Planen des Löschens der Nachrichten nach Ablauf der Zeit
        setTimeout(async () => {
            try {
                await deleteMessages();
                // Feedback-Nachricht, dass die Löschung abgeschlossen ist
                await conn.sendMessage(m.chat, `Nachrichten von ${userJid} wurden für ${duration} Minuten gelöscht.`);
            } catch (error) {
                throw `Fehler beim geplanten Löschen der Nachrichten: ${error}`;
            }
        }, duration * 60000);

        // Bestätige den Befehl
        return conn.sendMessage(m.chat, `Nachrichten von ${userJid} werden für ${duration} Minuten gelöscht.`);
    } catch (error) {
        console.error(`Fehler im Handler /deluser:`, error);
        throw `Es ist ein Fehler aufgetreten: ${error}`;
    }
};

handler.help = ['deluser <Dauer>'];
handler.tags = ['group'];
handler.command = /^del(user)?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;