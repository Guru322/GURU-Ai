let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Überprüfe, ob der Befehl von einem bestimmten Benutzer stammt
        const ownerJid = '4915236774240@s.whatsapp.net';
        if (m.sender !== ownerJid) throw `Dieser Befehl kann nur vom Besitzer ausgeführt werden.`;

        // Laden Sie alle Plugins (hier als Beispiel ein Array von Plugin-Namen)
        const plugins = [
            'plugin1.js',
            'plugin2.js',
            'plugin3.js',
            // Fügen Sie hier alle Plugins hinzu, die überprüft werden sollen
        ];

        // Funktion zum Testen und Neustarten der Plugins
        let testAndRestartPlugins = async () => {
            for (let plugin of plugins) {
                try {
                    // Laden und testen Sie das Plugin (Beispiel)
                    let pluginModule = await import(`./plugins/${plugin}`);
                    if (typeof pluginModule.default !== 'function') throw `Plugin ${plugin} ist ungültig.`;

                    // Optional: Hier können Sie zusätzliche Tests für das Plugin hinzufügen

                    // Neustart des Plugins
                    delete require.cache[require.resolve(`./plugins/${plugin}`)];
                    await import(`./plugins/${plugin}`);
                    await conn.sendMessage(m.chat, { text: `Plugin ${plugin} wurde erfolgreich neu gestartet.` });
                } catch (error) {
                    console.error(`Fehler beim Testen/Neustarten des Plugins ${plugin}:`, error);
                    await conn.sendMessage(m.chat, { text: `Fehler beim Testen/Neustarten des Plugins ${plugin}: ${error}` });
                }
            }
        };

        // Führen Sie die Test- und Neustartfunktion aus
        await testAndRestartPlugins();

        // Abschlussnachricht
        return await conn.sendMessage(m.chat, { text: `Alle Plugins wurden überprüft und neu gestartet.` });
    } catch (error) {
        console.error(`Fehler im Handler /restartloop:`, error);
        await conn.sendMessage(m.chat, { text: `Es ist ein Fehler aufgetreten: ${error}` });
    }
};

handler.help = ['restartloop'];
handler.tags = ['system'];
handler.command = /^restartloop$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;