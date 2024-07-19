const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

let handlerAnisticker = async (m, { conn, text }) => {
  let imageUrl = 'https://example.com/image.jpg'; // Beispiel-URL zu einem Bild

  // Laden des Bildes
  let image = await loadImage(imageUrl);
  
  // Erstellen eines Canvas
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  
  // Zeichnen des Bildes auf das Canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Konvertieren des Canvas in ein Buffer
  const buffer = canvas.toBuffer('image/webp');
  
  // Speichern des Stickers temporär
  let tempFileName = './temp/sticker.webp'; // Pfad zum temporären Speichern
  fs.writeFileSync(tempFileName, buffer);

  // Senden des Stickers
  await conn.sendSticker(m.chat, tempFileName, { author: 'Bot', pack: 'Sticker Pack' });

  // Optional: Löschen der temporären Datei nach dem Senden
  fs.unlinkSync(tempFileName);
};

handlerAnisticker.help = ['anisticker'];
handlerAnisticker.tags = ['utility'];
handlerAnisticker.command = /^anisticker$/i;

export default handlerAnisticker;