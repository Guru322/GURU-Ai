import Heroku from 'heroku-client';

let handler = async (m, { isROwner }) => {
    if (isROwner) {
        await m.reply('⚙️ Retrieving Config Vars...\nWait a moment');

        const heroku = new Heroku({ token: process.env.KEY });
        const appName = process.env.APP;

        try {
            const currentConfigVars = await heroku.get(`/apps/${appName}/config-vars`);
            const configVarList = Object.entries(currentConfigVars).map(([key, value]) => `${key}: ${value}`).join('\n');
            
            await m.reply(`🔍Config Vars:\n${configVarList}`);
        } catch (error) {
            console.error('Error retrieving config vars:', error.message);
            throw 'Failed to retrieve config vars. Check logs for details.';
        }
    } else {
        throw 'You are not the owner'; 
    }
};

handler.help = ['config'];
handler.tags = ['owner'];
handler.command = ['allvars'];

handler.rowner = true;

export default handler;
