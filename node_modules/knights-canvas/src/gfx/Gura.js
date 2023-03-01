const Canvas = require("canvas");

module.exports = class Gura {

    constructor() {
        this.gura = "https://i.ibb.co/N6ZFL42/Gura.jpg";
        this.nama = "lingz";
        
    }
    setName(value) {
        this.nama = value;
        return this;
    }
    
    async toAttachment() {
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");
        
        let iyga = await Canvas.loadImage(this.gura);
        ctx.drawImage(iyga, 0, 0, 600, 600);
  
    ctx.save();
	ctx.beginPath();
	ctx.rotate(-10 * Math.PI / 180);
	let usrname = this.nama;
    let name = usrname.length > 7 ? usrname.substring(0, 7) + "" : usrname;
    ctx.font = "75px brush";
    ctx.textAlign = 'center';
    ctx.fillStyle = "#00b8e4";
    ctx.fillText(name, 227, 547);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, 220, 560);
	ctx.restore();
	
        return canvas;
    }
};
