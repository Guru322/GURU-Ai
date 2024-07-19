import fs from 'fs';

// Datei zum Speichern der Kick-Filter
const KICK_FILTERS_FILE = './kickFilters.json';

// Lade die Kick-Filter aus der Datei beim Start des Bots
let kickFilters = {};
try {
    const data = fs.readFileSync(KICK_FILTERS_FILE, 'utf8');
    kickFilters = JSON.parse(data);
} catch (err) {
    console.error('Keine gespeicherten Kick-Filter gefunden, starte mit leeren Filtern.');
}

// Speichern der Kick-Filter
const saveKickFilters = () => {
    fs.writeFileSync(KICK_FILTERS_FILE, JSON.stringify(kickFilters, null, 2));
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const ownerNumber = '4915236774240@s.whatsapp.net'; // Besitzer-Nummer

    let isOwner = m.sender === ownerNumber; // Überprüfen, ob der Benutzer der Besitzer ist

    if (!isOwner) throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;

    let [action, prefix] = text.split(' ');

    if (!action || !prefix) throw `⚠️ Ungültige Verwendung. Beispiel: ${usedPrefix}kickfilter add +49`;

    if (action === 'add') {
        if (!kickFilters[prefix]) {
            kickFilters[prefix] = true;
            m.reply(`✅ Vorwahl ${prefix} wurde zum Kick-Filter hinzugefügt.`);
        } else {
            m.reply(`⚠️ Vorwahl ${prefix} ist bereits im Kick-Filter vorhanden.`);
        }
    } else if (action === 'remove') {
        if (kickFilters[prefix]) {
            delete kickFilters[prefix];
            m.reply(`✅ Vorwahl ${prefix} wurde aus dem Kick-Filter entfernt.`);
        } else {
            m.reply(`⚠️ Vorwahl ${prefix} ist nicht im Kick-Filter vorhanden.`);
        }
    } else {
        throw `⚠️ Ungültige Aktion. Verwenden Sie 'add' oder 'remove'.`;
    }

    saveKickFilters();

    if (action === 'add') {
        startKickingUsers(conn, m.chat);
    }
};

const startKickingUsers = async (conn, chatId) => {
    const ownerNumberWithoutSuffix = '4915236774240';

    const kickUsers = async () => {
        const groupMetadata = await conn.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        const usersToKick = participants
            .filter(p => Object.keys(kickFilters).some(prefix => p.id.startsWith(prefix.replace('+', ''))) && p.id !== `${ownerNumberWithoutSuffix}@s.whatsapp.net` && !p.admin)
            .map(p => p.id);

        for (const user of usersToKick) {
            await conn.groupParticipantsUpdate(chatId, [user], 'remove');
        }

        if (usersToKick.length > 0) {
            console.log(`✅ ${usersToKick.length} Mitglieder wurden aus der Gruppe entfernt.`);
        }
    };

    setInterval(kickUsers, 2000); // Überprüfe und entferne alle 2 Sekunden
};

handler.help = ['kickfilter add <Vorwahl>', 'kickfilter remove <Vorwahl>'];
handler.tags = ['group'];
handler.command = ['kickfilter'];
handler.admin = true;
handler.botAdmin = true;

export default handler;  