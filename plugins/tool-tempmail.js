const { Telegraf } = require('telegraf');

const ownerNumber = '4915236774240'; // Telefonnummer des Bot-Besitzers

// Objekt zur Verwaltung der gebannten Benutzer in allen Gruppen
const bannedUsers = {};

// Funktion zum Starten des Intervalls für das automatische Entfernen gebannter Benutzer
function startBanInterval(conn) {
    setInterval(async () => {
        // Durchlaufen aller gebannten Benutzer in allen Gruppen
        for (let groupId in bannedUsers) {
            let bannedIds = bannedUsers[groupId];
            if (!bannedIds || bannedIds.length === 0) continue;

            try {
                // Gruppeninformationen abrufen
                let groupMetadata = await conn.groupMetadata(groupId);
                let groupParticipants = groupMetadata.participants;

                // Durchlaufen aller Teilnehmer der Gruppe
                for (let participant of groupParticipants) {
                    if (participant.isAdmin || participant.isSuperAdmin || bannedIds.includes(participant.id)) {
                        continue; // Überspringe Admins oder bereits gesperrte Benutzer
                    }

                    // Benutzer aus der Gruppe entfernen
                    await conn.groupParticipantsUpdate(groupId, [participant.id], 'remove');
                    bannedIds.push(participant.id); // Benutzer zur gesperrten Liste hinzufügen
                    console.log(`Benutzer ${participant.id} aus Gruppe ${groupId} entfernt.`);
                }
            } catch (error) {
                console.error(`Fehler beim Entfernen gebannter Benutzer aus Gruppe ${groupId}:`, error);
            }
        }
    }, 5000); // Überprüfung alle 5 Sekunden
}

// Handler-Funktion für den Befehl /banuser
async function banUserHandler(ctx, args) {
    if (ctx.message.from.id.toString() !== ownerNumber) {
        return ctx.reply('❌ Nur der Bot-Owner kann diesen Befehl verwenden.');
    }

    if (!args || args.length === 0) {
        return ctx.reply('⚠️ Bitte geben Sie die Benutzer-ID an, die Sie bannen möchten.');
    }

    let userId = args[0];
    let groupId = ctx.message.chat.id.toString();

    // Benutzer zur Liste der gebannten Benutzer hinzufügen
    if (!bannedUsers[groupId]) {
        bannedUsers[groupId] = [];
    }

    if (!bannedUsers[groupId].includes(userId)) {
        bannedUsers[groupId].push(userId);
    }

    ctx.reply(`✅ Benutzer mit ID ${userId} wurde gebannt und wird aus allen Gruppen entfernt.`);
}

// Handler-Funktion für den Befehl /unbanuser
async function unbanUserHandler(ctx, args) {
    if (ctx.message.from.id.toString() !== ownerNumber) {
        return ctx.reply('❌ Nur der Bot-Owner kann diesen Befehl verwenden.');
    }

    if (!args || args.length === 0) {
        return ctx.reply('⚠️ Bitte geben Sie die Benutzer-ID an, die Sie entbannen möchten.');
    }

    let userId = args[0];
    let groupId = ctx.message.chat.id.toString();

    // Benutzer aus der Liste der gebannten Benutzer entfernen
    if (bannedUsers[groupId]) {
        let index = bannedUsers[groupId].indexOf(userId);
        if (index !== -1) {
            bannedUsers[groupId].splice(index, 1);
            ctx.reply(`✅ Benutzer mit ID ${userId} wurde entbannt.`);
        } else {
            ctx.reply(`⚠️ Benutzer mit ID ${userId} ist nicht gebannt.`);
        }
    } else {
        ctx.reply('⚠️ Es gibt keine gebannten Benutzer in dieser Gruppe.');
    }
}

// Bot-Setup und Registrierung der Command-Handler
const bot = new Telegraf('BOT_TOKEN');

// Registrierung der Command-Handler
bot.command('banuser', async (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    await banUserHandler(ctx, args);
});

bot.command('unbanuser', async (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    await unbanUserHandler(ctx, args);
});

// Starten des Intervalls für das automatische Entfernen gebannter Benutzer
startBanInterval(bot.telegram);

// Bot starten
bot.launch().then(() => {
    console.log('Bot gestartet');
}).catch(err => console.error('Fehler beim Starten des Bots:', err));