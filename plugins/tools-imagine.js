import fetch from "node-fetch";

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    let query = "Oops! I need an input text. Try something like this:\n.midjourney man kissing";
    let text;
    
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
        m.reply(`Let's see what image I can dream up from "${text}"...`);
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
        m.reply(`Aha! Using your quoted text, "${text}", let's generate an image...`);
    } else throw query;
    
    try {
        m.reply("Brewing up some AI magic... 🧙‍♂️");
        const imgURLs = await Draw(text);
        if (imgURLs.length > 0) {
            const randomIndex = Math.floor(Math.random() * imgURLs.length);
            const randomImgURL = imgURLs[randomIndex];
            conn.sendFile(m.chat, randomImgURL, text, `*[Ta-da! Here's your result:]*\n"${text}"`, m);
        } else {
            throw 'No images found in the API response.';
        }
    } catch (e) {
        throw 'Oh snap! Something went wrong while generating the image. 🥺';
    }
}

handler.help = ["imagine"];
handler.tags = ["AI"];
handler.command = /^imagine$/i;

export default handler;

async function Draw(prompt) {
    try {
        const response = await fetch(`https://v2-guru-indratensei.cloud.okteto.net/scrape?query=${encodeURIComponent(prompt)}`);
        const responseData = await response.json();
        
        if (responseData.image_links && responseData.image_links.length > 0) {
            return responseData.image_links;
        } else {
            throw 'No image links found in the API response.';
        }
    } catch (error) {
        throw 'Failed to fetch image links from the API.';
    }
}
