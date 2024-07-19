const exchangeDictionary = {
    'hey': 'baum',
    'hello': 'tree',
    'hi': 'forest',
    'how are you': 'I am fine, thank you!',
    'wie gehts dir': 'Mir geht es gut, danke!',
    'was machst du': 'Ich chatte gerade mit dir!',
    // Füge hier weitere Austauschpaare hinzu
};

let handler = async (m, { text }) => {
    try {
        // Überprüfen, ob eine Nachricht angegeben wurde
        if (!text) {
            throw 'Du hast keine Nachricht angegeben.';
        }

        // Durchsuche die Nachricht nach Schlüsselwörtern und ersetze diese
        let replacedText = replaceKeywords(text);

        // Sende die Nachricht mit ersetzen Schlüsselwörtern zurück
        await m.reply(`Ersetzte Nachricht: ${replacedText}`);
    } catch (error) {
        console.error('Fehler beim Ersetzen:', error);
        await m.reply(`Es ist ein Fehler aufgetreten: ${error}`);
    }
};

// Funktion zum Ersetzen von Schlüsselwörtern in der Nachricht
function replaceKeywords(text) {
    // Trenne die Nachricht in Wörter und ersetze Schlüsselwörter aus dem Wörterbuch
    let words = text.toLowerCase().split(' ');
    let replacedWords = words.map(word => {
        return exchangeDictionary[word] || word; // Wenn Schlüsselwort existiert, ersetze es, ansonsten behalte das Wort bei
    });
    return replacedWords.join(' ');
}

handler.command = /^skyin$/i;
handler.group = true;

module.exports = handler;9