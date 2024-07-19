import fs from 'fs';
import Jimp from 'jimp';

let changeProfilePictureInterval = null;
const profilePictures = [
    './profile_pics/pic1.jpg',
    './profile_pics/pic3.jpg', // Nur rote und blaue Bilder
];

async function generatePlaceholderImages() {
    const colors = ['#FF0000', '#0000FF']; // Nur rote und blaue Farben
    for (let i = 0; i < colors.length; i++) {
        const image = new Jimp(512, 512, colors[i]);
        await image.writeAsync(`./profile_pics/pic${i + 1}.jpg`);
    }
}

let handler = async (m, { conn, args }) => {
    try {
        // Überprüfen, ob der Befehl mit "on" oder "off" gesendet wurde
        if (args[0] === 'on') {
            if (changeProfilePictureInterval) {
                throw 'Das automatische Profilwechseln ist bereits aktiviert.';
            }

            // Überprüfen, ob alle angegebenen Dateien existieren
            let allPicturesExist = profilePictures.every(picture => fs.existsSync(picture));
            if (!allPicturesExist) {
                console.log('Erstelle Platzhalterbilder, da einige Bilder fehlen...');
                await generatePlaceholderImages();
            }

            let currentIndex = 0;
            changeProfilePictureInterval = setInterval(async () => {
                try {
                    currentIndex = (currentIndex + 1) % profilePictures.length;
                    let profilePicture = profilePictures[currentIndex];
                    await conn.updateProfilePicture(m.chat, { url: profilePicture });
                } catch (error) {
                    console.error('Fehler beim Ändern des Profilbildes:', error);
                }
            }, 2000); // Wechselintervall in Millisekunden (2 Sekunden)

            await conn.sendMessage(m.chat, { text: 'Automatisches Profilwechseln wurde aktiviert.' });

        } else if (args[0] === 'off') {
            if (!changeProfilePictureInterval) {
                throw 'Das automatische Profilwechseln ist nicht aktiviert.';
            }

            clearInterval(changeProfilePictureInterval);
            changeProfilePictureInterval = null;
            await conn.sendMessage(m.chat, { text: 'Automatisches Profilwechseln wurde deaktiviert.' });

        } else {
            throw 'Ungültiger Befehl. Verwenden Sie /autop on oder /autop off.';
        }
    } catch (error) {
        console.error('Fehler im Handler /autop:', error);
        await conn.sendMessage(m.chat, { text: `Es ist ein Fehler aufgetreten: ${error}` });
    }
};

handler.help = ['autop <on|off>'];
handler.tags = ['profile'];
handler.command = /^autop$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;