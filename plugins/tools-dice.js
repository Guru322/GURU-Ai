import { Sticker } from "wa-sticker-formatter";
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    // m.relpy("This Command Is Disabled By Dr.Osman");
    let stiker;
    let result = Math.floor(Math.random() * 6) + 1;

    // conn.sendFile(m.chat, pp);
    async function createSticker(img, url, packName, authorName, quality) {
        let stickerMetadata = {
            type: "full",
            pack: packName,
            author: authorName,
            quality,
        };
        return new Sticker(img ? img : url, stickerMetadata).toBuffer();
    }
    stiker = await createSticker(
        false,
        `./Assets/dice/dice_${result}.png`,
        `Number ${result}`,
        "Dice",
        100
    );
    m.reply(stiker);
    m.react("🎲");
};

handler.help = ["dice"];
handler.tags = ["dice"];
handler.command = ["dice"];

export default handler;
