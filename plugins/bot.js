let handler = async (m, { conn }) => {
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    m.reply(`Hey ${taguser}! I'm here to assist you :)`);    
}

handler.customPrefix = /^(silverfox|silver|bot)$/i;
handler.command = new RegExp;

export default handler;
