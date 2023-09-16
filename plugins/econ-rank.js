import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
  let user = global.db.data.users[who];
  let { exp, level, role } = global.db.data.users[who];
  let { min, xp } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);

  let crxp = exp - min
  let customBackground  = './src/rankbg.jpg'
  let requiredXpToLevelUp = xp

  const card = await new Canvacord.Rank()
  .setAvatar(pp)
  .setLevel(level)
  .setCurrentXP(crxp) 
  .setRequiredXP(requiredXpToLevelUp) 
  .setProgressBar('#db190b', 'COLOR') // Set progress bar color here
  .setDiscriminator(who.substring(3, 7))
  .setCustomStatusColor('#db190b')
  .setLevelColor('#FFFFFF', '#FFFFFF')
  .setOverlay('#000000')
  .setUsername(username)
  .setBackground('IMAGE', customBackground)
  .setRank(level, 'LEVEL', false)
  .renderEmojis(true)
  .build();

  const currentUserRole = global.rpg.role(level);

  let pastRanksText = '';
  let highestLevelReached = -1; // Initialize with a level that's lower than the lowest possible level

  const levelSymbols = {
    0: '',
    5: '*➳*',
    10: '*𐏓・*',
  };

  for (let i = 0; i <= level; i++) {
    const pastRole = global.rpg.role(i);
    if (pastRole.level > highestLevelReached) {
      highestLevelReached = pastRole.level; // Update the highest level reached
      const symbol = levelSymbols[i] || '';
    pastRanksText = `*Level ${i} | ${pastRole.name}*\n` + pastRanksText 
  }
}

  //const str = `🏮 *Username:* ${username}\n\n⭐ *Experience:* ${crxp} / ${requiredXpToLevelUp}\n\n🏅 *Rank:* ${role}\n\n🍀 *Level:* ${level}\n\n*Past Levels:*\n${pastRanksText}`

  const str = `🏮 *Username:* ${username}\n\n⭐ *Experience:* ${crxp} / ${requiredXpToLevelUp}\n\n🏅 *Rank:* *${role}* \n${pastRanksText}`

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
  }}

handler.help = ['rank'];
handler.tags = ['group'];
handler.command = ['rank'];

export default handler;