import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Enter the Instagram Username\n\n📌Example: ${usedPrefix + command} asli_guru69`;
  }
  
  try {
    let response = await fetch(`https://www.guruapi.tech/api/igstalk?username=${args[0]}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    let res = await response.json();

    let te = `
┌──「 *STALKING* 
▢ *🔖Name:* ${res.name} 
▢ *🔖Username:* ${res.username}
▢ *👥Followers:* ${res.followers}
▢ *🫂Following:* ${res.following}
▢ *📌Bio:* ${res.biography}
▢ *🏝️Posts:* ${res.posts}
▢ *🔗 Link:* https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`;

    await conn.sendFile(m.chat, res.profile_picture, 'profile_picture.png', te, m);

  } catch (error) {
    console.error(error);
    throw 'An error occurred while fetching the Instagram profile. Please try again later.';
  }
};

handler.help = ['igstalk'];
handler.tags = ['downloader'];
handler.command = ['igstalk'];

export default handler;

