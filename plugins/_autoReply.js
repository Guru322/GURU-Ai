export async function all(m) {
  // When someone sends an invite link invitation in private
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Follow this link')) && !m.isBaileys && !m.isGroup) {
    // Reply to the user who sent the group link to the bot's DM
    this.sendMessage(m.chat, {
      text: `Hello @${m.sender.split('@')[0]},\n\nThank you for inviting me! Your request has been received and will be processed once approved. For further infor, contact our representative_.`.trim()
    }, { quoted: m });

    // Ensure the reply is only sent in private chat (DM)
    if (m.isPrivate) {
      // Customize the message as needed
    }
  }

  return !0;
}
