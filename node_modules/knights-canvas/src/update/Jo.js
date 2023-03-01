const Canvas = require("canvas");

module.exports = class Jo {

constructor() {
this.bg = "https://i.ibb.co/9Y5Smqs/20211104-094134.png";
this.image = "https://i.ibb.co/xG8L4mz/images.jpg";
}
setImage(value) {
this.image = value;
return this;
}
async toBuild() {



const canvas = Canvas.createCanvas(600, 337);
const ctx = canvas.getContext("2d");
   
//******let background = await Canvas.loadImage(this.bg);*****//
ctx.save();
ctx.beginPath();
ctx.rotate(-8 * Math.PI / 180);
let avatar = await Canvas.loadImage(this.image);
ctx.drawImage(avatar, 120, 173, 161, 113);
ctx.restore();

let bg1 = await Canvas.loadImage(this.bg);
ctx.drawImage(bg1, 0, 0, 600, 337);


//****©LENDRA****//
   
return canvas;
}
};
