let handler = async (m, { conn }) => {
    let name = "Silver Fox"; //name

    let message = `Greetings, I am ${name}, the Silver Fox. 🦊\n\nI'm alive and ready to assist you! Explore my capabilities. 🤖 And hey, keep smiling! 😄`;

    await conn.sendMessage(m.chat, message, 'text', { 
        quoted: m,
        contextInfo: {
            externalAdReply: {
                title: "I AM ALIVE",
                body: message,
                mediaType: 2, // Setting mediaType to 2 for text
            }
        }
    });
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i 

export default handler;
