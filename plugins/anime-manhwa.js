import fetch from 'node-fetch';


let handler = async (m, { conn, text }) => {
    if (!text) throw 'Please provide manhwa name to search for.';
    let query = encodeURIComponent(text)

    const url = `https://asura.guruapi.tech/asura/search?name=${query}`;

    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
        throw `An error occurred: ${json.error}`;
    }
   
    let link = json.data[0].link;

    const url2 = `https://asura.guruapi.tech/asura/details?url=${link}`;

    let response2 = await fetch(url2);
    let json2 = await response2.json();

    if (!response2.ok) {
        throw `An error occurred: ${json2.error}`;
    }
    let lastEpisodeUrl = 'N/A';

    if (json2.data.urls && json2.data.urls.length > 0) {
        lastEpisodeUrl = json2.data.urls[json2.data.urls.length - 1];
    }

    let message = `Name: ${json2.data.title}\n\nDescription: ${json2.data.description}\n\nGenre: ${json2.data.genre}\n\nStatus: ${json2.data.status}\n\nLast Episode: ${lastEpisodeUrl}\n`
    
    let thumb = json.data[0].image;

    await conn.sendMessage(m.chat, {
        image: { url: thumb },
        caption: message
    })
}

handler.help = ['manhwa'];
handler.tags = ['anime'];
handler.command = /^manhwa/i;

export default handler;
