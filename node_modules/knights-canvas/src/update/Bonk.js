const Canvas = require("canvas");

module.exports = class Bonk {

constructor() {
this.bg = "https://i.ibb.co/1v3cHjr/11.jpg";
this.bg2 = "https://i.ibb.co/X4VVhkX/22.png";
this.avatar1 = "https://i.ibb.co/G5mJZxs/rin.jpg";
this.avatar2 = "https://i.ibb.co/BZgRzh0/IMG-20210621-WA0000.jpg";
}

 //avatar
setAvatar1(value) {
this.avatar1 = value;
return this;
}
setAvatar2(value) {
this.avatar2 = value;
return this;
}

async toBuild() {


// Create canvas
const canvas = Canvas.createCanvas(600, 337);
const ctx = canvas.getContext("2d");

//NGENTOT AJG 🖕🏻
   
// Draw background
let background1 = await Canvas.loadImage(this.bg);
ctx.drawImage(background1, 0, 0, 600, 337);

ctx.save();
ctx.beginPath();
ctx.ellipse(422, 175, 40, 55, Math.PI / 4, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();
ctx.clip();
let avawtar = await Canvas.loadImage(this.avatar1);
ctx.drawImage(avawtar, 373, 115, 110, 110);
ctx.restore();

let background2 = await Canvas.loadImage(this.bg2);
ctx.drawImage(background2, 0, 0, 600, 337);
  
  
ctx.save();
ctx.beginPath();
ctx.arc(105, 100, 48, 0, Math.PI * 2, true);
//ctx.ellipse(95, 106, 50, 75, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();
ctx.clip();
let avatar = await Canvas.loadImage(this.avatar2);
ctx.drawImage(avatar, 57, 56, 96, 96);
ctx.restore();

   
   
return canvas;
}
};
