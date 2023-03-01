const Canvas = require("canvas");

module.exports = class Gfx4 {

    constructor() {
        this.bg = "https://i.ibb.co/370sVtK/Gfx4.jpg";
        this.text1 = "lingz";
        this.text2 = "knights";
        
    }
    setText1(value) {
        this.text1 = value;
        return this;
    }
    setText2(value) {
        this.text2 = value;
        return this;
    }
    async toAttachment() {
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");
          
        let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 600, 600);
        
    ctx.save();
	ctx.beginPath();
	ctx.rotate(-4 * Math.PI / 180);
    let usrname = this.text1;
    let name = usrname.length > 5 ? usrname.substring(0, 5) + "" : usrname;
    ctx.globalAlpha = 1;
    ctx.textAlign = 'center';
    ctx.font = "115px Unitalic";
    ctx.fillStyle = "#d0b183";
    ctx.shadowBlur = 6;
    ctx.shadowColor = "black";
    ctx.fillText(name, 300, 540);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeText(name, 300, 540);
	ctx.restore();
        
    ctx.save();
	ctx.beginPath();
	ctx.rotate(-4 * Math.PI / 180);
    ctx.shadowBlur = 4;
    ctx.shadowColor = "black";
    let uname = this.text2;
    let nama = uname.length > 5 ? uname.substring(0, 5) + "" : uname;
    ctx.font = "bold 62px Unitalic";
    ctx.textAlign = 'left';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(nama, 320, 590);
    ctx.lineWidth = 2;
    ctx.fillStyle = "#000000";
    ctx.strokeText(nama, 320, 590);
	ctx.restore(); 
	
        return canvas;
    }
};
