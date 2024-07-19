import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  try {
    // Beispiel-URL für das Bild
    let imageUrl = 'https://files.fm/thumb_show.php?i=a94jx4v8z5';

    // Lade das Bild von der URL herunter
    let image = await Jimp.read(imageUrl);

    // Lade das Wasserzeichen (Text) in Jimp
    let watermark = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK); // Schriftart und Größe anpassen

    // Positioniere das Wasserzeichen auf dem Bild (oben links)
    let watermarkX = 10; // X-Position des Wasserzeichens
    let watermarkY = 10; // Y-Position des Wasserzeichens
    let watermarkOptions = {
      text: '<《errox1322》>',
      alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
      alignmentY: Jimp.VERTICAL_ALIGN_TOP
    };
    
    // Drucke das Wasserzeichen auf das Bild
    image.print(watermark, watermarkX, watermarkY, watermarkOptions);

    // Konvertiere das Bild zu einem Buffer
    let outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    // Sende das Bild mit Wasserzeichen in den Chat
    await conn.sendFile(m.chat, outputBuffer, 'image_with_watermark.jpg', 'Hier ist das Bild mit Wasserzeichen.');

  } catch (error) {
    console.error(error);
    throw error; // Fehlerbehandlung je nach Bedarf
  }
};

handler.help = ['anibild'];
handler.tags = ['utility'];
handler.command = /^anibild$/i;

export default handler;