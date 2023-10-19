//Thanks Chatgpt🤡
import { performance } from 'perf_hooks';

// This function is used to prevent users from sending too many messages in a chat application or bot.

export async function before(m, { conn }) {
    // Get information about users and chats from global data.
    const users = global.db.data.users;
    const chats = global.db.data.chats;

    // Check various conditions to determine if anti-spam measures should be applied.

    // If anti-spam is disabled for this chat, or if the message is from the bot itself,
    // or if the message type is a system message or poll update, do nothing and exit the function.
    if (!chats[m.chat].antiSpam || m.isBaileys || m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') {
        return;
    }

    // If there is no message content, or if the sender is banned, or if the chat is banned,
    // do nothing and exit the function.
    if (!m.msg || !m.message || m.key.remoteJid !== m.chat || users[m.sender].banned || chats[m.chat].isBanned) {
        return;
    }

    // Create or access a 'spam' object for the sender to keep track of spam-related data.
    this.spam = this.spam || {};
    this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 };

    // Get the current time in milliseconds.
    const now = performance.now();

    // Calculate the time difference since the last message from this sender.
    const timeDifference = now - this.spam[m.sender].lastspam;

    // If the time difference is less than 10 seconds, it means the sender is sending messages too quickly.
    if (timeDifference < 10000) {
        // Increment the sender's spam count.
        this.spam[m.sender].count++;

        // If the sender's spam count reaches 5 or more, remove the sender from the group.
        if (this.spam[m.sender].count >= 5) {
            await conn.groupRemove(m.chat, [m.sender]);

            // Notify about the removal.
            await conn.reply(m.chat, `❌ *@${m.sender.split('@')[0]}* has been removed from the group for spamming`, m);

            // Remove the sender's spam count.
            this.spam[m.sender].count = 0;

            return; // No need to proceed with further processing after removing the participant.
        }
    } else {
        // If the time difference is greater than or equal to 10 seconds, reset the sender's spam count.
        this.spam[m.sender].count = 0;
    }

    // Update the 'lastspam' timestamp to the current time for the sender.
    this.spam[m.sender].lastspam = now;
}
