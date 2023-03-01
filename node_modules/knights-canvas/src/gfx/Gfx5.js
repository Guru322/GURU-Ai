const Canvas = require("canvas");

module.exports = class Gfx5 {

    constructor() {
        this.bg = "https://i.ibb.co/pLp5RVj/Gfx5.jpg";
        this.text1 = "lingz"; 
    }
    setText(value) {
        this.text1 = value;
        return this;
    }
    async toAttachment() {
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");
          
        let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 600, 600);
        
let usr = this.text1;
let name = usr.length > 5 ? usr.substring(0, 5) + " " : usr;
ctx.font = "87px Beam";
ctx.textAlign = 'left';
ctx.lineWidth = 6;
ctx.strokeStyle = '#ffffff';
ctx.strokeText(name, 90, 563);
ctx.font = "87px Beam";
ctx.textAlign = 'left';
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 6;
ctx.strokeText(name, 197, 509);
ctx.font = "87px Beam";
ctx.textAlign = 'left';
ctx.fillStyle = "#3ee9e0";
ctx.fillText(name, 142, 536);
ctx.strokeStyle = '#000000';
ctx.lineWidth = 5;
ctx.strokeText(name, 142, 536);
	
        return canvas;
    }
};
