let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    } else {
        who = m.chat;
    }
    let name = await conn.getName(m.quoted.sender)
    if (!who) throw 'Tag to kar kisko owner bnana h!';
    if (global.owner.includes(who.split('@')[0])) throw 'Vo pehle se owner h!';
    global.owner.push([who.split('@')[0], name, true]);
    const caption = `Now @${who.split('@')[0]} has been made an Owner!`;
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner @user']
handler.tags = ['owner']
handler.command = /^(add|give|-)(owner|sudo)$/i;
handler.owner = true

export default handler;
