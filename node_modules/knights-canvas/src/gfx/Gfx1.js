const Canvas = require("canvas");

module.exports = class Gfx1 {

    constructor() {
        this.bg = "https://i.ibb.co/LS98ktS/Bg-gfx1.jpg";
        this.fm = "https://i.ibb.co/8rXtN1J/20210820-161743.png";
        this.nama = "lingz";
        
    }
    setName(value) {
        this.nama = value;
        return this;
    }
    
    async toAttachment() {
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");
        let usr = this.nama;
	    let name = usr.length > 8 ? usr.substring(0, 8) + " " : usr;
	    let nama = usr.length > 6 ? usr.substring(0, 6) + " " : usr;
	
        let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 600, 600);
  
        ctx.font = "120px Built";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(nama, 20, 190);
        ctx.fillStyle = "#e2e2e2";
        ctx.fillText(nama, 20, 290);
        ctx.fillStyle = "#d7d7d7";
        ctx.fillText(nama, 20, 390);
        ctx.fillStyle = "#c0c2c1";
        ctx.fillText(nama, 20, 490);
        ctx.fillStyle = "#a4a4a6";
        ctx.fillText(nama, 20, 590);
        let rang = await Canvas.loadImage(this.fm);
        ctx.drawImage(rang, 0, 0, 600, 600);
        ctx.shadowBlur = 30;
        ctx.shadowColor='#000000';
        ctx.textAlign = 'center';
        ctx.fillStyle = "#4f5669";
        ctx.fillText(name, 260, 590);
        return canvas;
    }
};
