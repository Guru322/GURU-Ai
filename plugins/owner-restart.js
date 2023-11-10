import { spawn } from 'child_process';
import { Heroku } from 'heroku-client';

let handler = async (m, { isROwner }) => {

    if (isROwner) {
        await m.reply('🔄 Restarting Bot...\nWait a moment');

        const heroku = new Heroku({ token: process.env.KEY });
        const appName = process.env.APP;

        try {
            await heroku.patch(`/apps/${appName}/formation/web`, { body: { quantity: 0 } });
            await heroku.patch(`/apps/${appName}/formation/web`, { body: { quantity: 1 } });
        } catch (error) {
            console.error('Error restarting web dyno:', error.message);
            throw 'Failed to restart web dyno';
        }
    } else {
        throw 'You are not the owner';
    }
};


handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];

handler.rowner = true;

export default handler;
