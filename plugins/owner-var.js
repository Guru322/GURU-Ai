import { spawn } from 'child_process';
import Heroku from 'heroku-client';

let handler = async (m, { isROwner, text }) => {

    if (isROwner) {
   
        const args = text.trim().split(' ');

        if (args.length !== 2 || !args[1].includes(':')) {
            throw 'Usage: !var key:value';
        }

        const [configKey, configValue] = args[1].split(':');

        await m.reply(`⚙️ Modifying Config Var...\nAdding/Modifying ${configKey} with value ${configValue}\nWait a moment`);

        const heroku = new Heroku({ token: process.env.KEY });
        const appName = process.env.APP;

        try {

            const currentConfigVars = await heroku.get(`/apps/${appName}/config-vars`);

            currentConfigVars[configKey] = configValue;

            await heroku.patch(`/apps/${appName}/config-vars`, { body: currentConfigVars });
        } catch (error) {
            console.error('Error modifying config var:', error.message);
            throw 'Failed to modify config var';
        }
    } else {
        throw 'You are not the owner'; 
    }
};


handler.help = ['config'];
handler.tags = ['owner'];
handler.command = ['var'];

handler.rowner = true;

export default handler;

