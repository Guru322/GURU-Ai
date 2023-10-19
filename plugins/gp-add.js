let handler = async (m, { conn, text }) => {
    m.reply("I can't add anyone because if I do, WhatsApp might ban my account! 🤭");
}

handler.help = ['add']
handler.tags = ['group']
handler.command = ['add']
handler.admin = true
handler.group = true
handler.rowner = true
handler.botAdmin = true

export default handler;
