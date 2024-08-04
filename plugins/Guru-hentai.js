import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!global.db.data.chats[m.chat].nsfw)
    throw `🚫 Group doesn't support NSFW. Enable it by using *${usedPrefix}enable* nsfw.`;

  let userAge = global.db.data.users[m.sender].age;
  if (userAge < 17) throw `❎ You need to be at least 18 years old.`;

  try {
    m.reply(global.wait);
    let res = await fetch('https://api.guruapi.tech/hanime/trend');
    let json = await res.json();

    if (!json || json.length === 0) throw 'No data found';

    let topTrending = json.slice(0, 8);

    let message = '🔥 **Top 8 Trending Hentai of the Week** 🔥\n\n';

    topTrending.forEach((data, index) => {
      message += `
${index + 1}. **${data.name}**
   - 📎 Link: https://hanime.tv/videos/hentai/${data.slug}
   - 👁️ Views: ${data.views}

`;
    });

    await conn.sendFile(m.chat, topTrending[0].cover_url, 'hanime.jpeg', message, m);
  } catch (error) {
    console.error(error);
    throw `*ERROR: Something went wrong. Please try again later.*`;
  }
};

handler.command = /^(hentai)$/i;
export default handler;
