import fetch from "node-fetch"

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
        await Draw(text).then((img) => {
            conn.sendFile(m.chat, img, text, `*[Ta-da! Here's your result:]*\n"${text}"`, m);
        });
    } catch (e) {
        throw 'Oh snap! Something went wrong while generating the image. 🥺';
    }
}

handler.help = ["imagine"];
handler.tags = ["ai"];
handler.command = /^imagine$/i;

export default handler;

async function Draw(prompt) {
    const Blobs = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v2",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer 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",
            },
            body: JSON.stringify({ inputs: prompt }),
        }
    ).then((res) => res.blob());
    
    const arrayBuffer = await Blobs.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
}
