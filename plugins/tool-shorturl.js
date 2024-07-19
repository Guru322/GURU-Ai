import fs from 'fs';

// Datei zum Speichern der Codes
const GIF_CODES_FILE = './gifCodes.json';

// Lade die Codes aus der Datei beim Start des Bots
let gifCodes = {};
try {
    const data = fs.readFileSync(GIF_CODES_FILE, 'utf8');
    gifCodes = JSON.parse(data);
} catch (err) {
    console.error('Keine gespeicherten Codes gefunden, starte mit leeren Codes.');
}

const redeemedCodes = {}; // Speichert die eingelösten Codes mit Datum und Uhrzeit

const saveGifCodes = () => {
    fs.writeFileSync(GIF_CODES_FILE, JSON.stringify(gifCodes, null, 2));
};

const generateRandomCode = () => {
    return [...Array(4)].map(() => Math.random().toString(36)[2]).join('') + '-' +
           [...Array(4)].map(() => Math.random().toString(36)[2]).join('') + '-' +
           [...Array(4)].map(() => Math.random().toString(36)[2]).join('') + '-' +
           [...Array(4)].map(() => Math.random().toString(36)[2]).join('');
};

const handler = async function (m, { conn, text, usedPrefix, command, quoted, mime }) {
    const ownerNumber = '4915236774240@s.whatsapp.net'; // Besitzer-Nummer

    let isOwner = m.sender === ownerNumber; // Überprüfen, ob der Benutzer der Besitzer ist

    if (command === 'gif') {
        if (!text) {
            throw `⚠️ Bitte geben Sie einen Code ein.\n\nVerwendung: ${usedPrefix}gif <code>`;
        }

        if (!gifCodes[text]) {
            m.reply(`❌ Ungültiger Code.`);
            return;
        }

        if (!gifCodes[text].active) {
            m.reply(`❌ Der Code ${text} ist momentan nicht aktiv.`);
            await conn.sendMessage(ownerNumber, {
                text: `⚠️ Der Code ${text} wurde versucht einzulösen, ist aber nicht aktiv. Bitte aktivieren Sie den Code.`
            }, { quoted: m });
            return;
        }

        if (gifCodes[text].uses === 0) {
            m.reply(`❌ Der Code ${text} kann nicht mehr verwendet werden, da die maximale Anzahl an Verwendungen erreicht wurde.`);
            return;
        }

        let { message, image, uses } = gifCodes[text];
        await conn.sendMessage(m.sender, {
            text: `✅ Ihr Code wurde erfolgreich eingelöst.\n\nNachricht: ${message}`
        }, { quoted: m });

        if (image) {
            await conn.sendMessage(m.sender, { image: { url: image }, caption: "Hier sind Ihre eSIM-Daten" }, { quoted: m });
        }

        let now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
        if (!redeemedCodes[text]) {
            redeemedCodes[text] = [];
        }
        redeemedCodes[text].push(now);

        gifCodes[text].uses = uses === Infinity ? Infinity : uses - 1;
        saveGifCodes();

        // Benachrichtigen des Besitzers über die erfolgreiche Einlösung
        await conn.sendMessage(ownerNumber, {
            text: `✅ Der Code ${text} wurde erfolgreich von ${m.sender} am ${now} eingelöst.`
        }, { quoted: m });

        // Nachricht in der Gruppe, dass der Code eingelöst wurde
        await conn.sendMessage(m.chat, {
            text: `✅ Der Code ${text} wurde erfolgreich eingelöst. Verbleibende Verwendungen: ${gifCodes[text].uses === Infinity ? 'Unbegrenzt' : gifCodes[text].uses}`
        }, { quoted: m });

        // Senden der temporären Nachricht
        let tempMessage = await conn.sendMessage(m.chat, {
            text: `${message}`
        });

        // Löschen der temporären Nachricht nach 1 Minute
        setTimeout(async () => {
            await conn.deleteMessage(m.chat, { id: tempMessage.key.id, remoteJid: m.chat, fromMe: true });
        }, 60000); // 60000 ms = 1 Minute

    } else if (command === 'setgif') {
        if (!isOwner) {
            throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;
        }

        let [uses, num, ...messageParts] = text.split(' ');
        if (!uses || !num || messageParts.length === 0) {
            throw `⚠️ Ungültige Verwendung. Beispiel: ${usedPrefix}setgif <verwendungen> <nummer> <nachricht>`;
        }

        let usesInt = parseInt(uses);
        if (isNaN(usesInt) || usesInt < 0 || usesInt > 10) {
            throw `⚠️ Die Anzahl der Verwendungen muss zwischen 0 (unbegrenzt) und 10 liegen.`;
        }

        let message = messageParts.join(' ');
        let code = generateRandomCode();
        let image = null;

        if (quoted && mime.startsWith('image/')) {
            let media = await conn.downloadMediaMessage(quoted);
            image = 'data:image/jpeg;base64,' + media.toString('base64'); // Speichert das Bild als base64-String
        }

        gifCodes[code] = { message, num, image, active: false, uses: usesInt === 0 ? Infinity : usesInt };
        saveGifCodes();

        await conn.sendMessage(m.sender, {
            text: `✅ Neuer Code generiert: ${code}`
        }, { quoted: m });

    } else if (command === 'gifcodelist') {
        if (!isOwner) {
            throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;
        }

        let codeList = Object.entries(gifCodes).map(([code, { message, num, image, active, uses }]) => {
            return `Code: ${code}\nNachricht: ${message}\nNummer: ${num}\nBild: ${image ? 'Ja' : 'Nein'}\nAktiv: ${active ? 'Ja' : 'Nein'}\nVerwendungen: ${uses === Infinity ? 'Unbegrenzt' : uses}`;
        }).join('\n\n');

        await conn.sendMessage(m.sender, {
            text: `📋 Aktuelle Codes:\n\n${codeList || 'Keine Codes verfügbar.'}`
        }, { quoted: m });

    } else if (command === 'delgif') {
        if (!isOwner) {
            throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;
        }

        if (!text) {
            throw `⚠️ Bitte geben Sie einen Code ein, um ihn zu löschen.\n\nVerwendung: ${usedPrefix}delgif <code>`;
        }

        if (!gifCodes[text]) {
            throw `❌ Ungültiger Code.`;
        }

        delete gifCodes[text];
        saveGifCodes();

        await conn.sendMessage(m.sender, {
            text: `✅ Code erfolgreich gelöscht: ${text}`
        }, { quoted: m });

    } else if (command === 'gifactivate') {
        if (!isOwner) {
            throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;
        }

        let [code, status] = text.split(' ');
        if (!code || !status || !gifCodes[code]) {
            throw `⚠️ Ungültige Verwendung. Beispiel: ${usedPrefix}gifactivate <code> <on/off>`;
        }

        gifCodes[code].active = status === 'on';
        saveGifCodes();

        await conn.sendMessage(m.sender, {
            text: `✅ Der Code ${code} wurde ${status === 'on' ? 'aktiviert' : 'deaktiviert'}.`
        }, { quoted: m });

    } else if (command === 'codeup') {
        if (!isOwner) {
            throw `❌ Sie sind nicht berechtigt, diesen Befehl zu verwenden.`;
        }

        let [oldCode, newCode] = text.split(' ');
        if (!oldCode || !newCode || !gifCodes[oldCode]) {
            throw `⚠️ Ungültige Verwendung. Beispiel: ${usedPrefix}codeup <alterCode> <neuerCode>`;
        }

        if (gifCodes[newCode]) {
            throw `❌ Der neue Code existiert bereits. Bitte wählen Sie einen anderen Code.`;
        }

        gifCodes[newCode] = { ...gifCodes[oldCode] };
        delete gifCodes[oldCode];
        saveGifCodes();

        await conn.sendMessage(m.sender, {
            text: `✅ Code erfolgreich geändert von ${oldCode} zu ${newCode}`
        }, { quoted: m });
    }
};

handler.help = ['gif', 'setgif', 'gifcodelist', 'delgif', 'gifactivate', 'codeup'];
handler.tags = ['tools'];
handler.command = ['gif', 'setgif', 'gifcodelist', 'delgif', 'gifactivate', 'codeup'];

export default handler;