const Canvas = require("canvas");

module.exports = class Gfx3 {

    constructor() {
        this.bg = "https://i.ibb.co/zss32zr/Bg-gfx3.png";
        this.fm = "https://i.ibb.co/0sBbXnb/Fm-gfx3.png";
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
        let usrname = this.text1;
        let name = usrname.length > 6 ? usrname.substring(0, 6) + "" : usrname;
	    let txt2 = this.text2;
        let txts2 = txt2.length > 6 ? txt2.substring(0, 6) + "" : txt2;
        
        let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 600, 600);
        
        let iya = await Canvas.loadImage(this.fm);
        ctx.drawImage(iya, 0, 0, 600, 600);
  
        ctx.save();
	ctx.beginPath();
	ctx.rotate(-4 * Math.PI / 180);
    ctx.globalAlpha = 1;
    ctx.font = "109px Unitalic";
    ctx.textAlign = 'center';
    ctx.fillStyle = "#bbbbbb";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.fillText(name, 300, 530);
    ctx.font = "109px Unitalic";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#000000";
    ctx.strokeText(name, 297, 527);
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#5ea1b2";
    ctx.font = "47px Unitalic";
    ctx.fillStyle = "#5ea1b2";
    ctx.fillText(txts2, 300, 580); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(txts2, 300, 580);
	ctx.restore();

        return canvas;
    }
};
