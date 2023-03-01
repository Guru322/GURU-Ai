const Canvas = require("canvas");

module.exports = class Gfx2 {

    constructor() {
        this.loli = "https://i.ibb.co/Qmj3ccd/Loli.png";
        this.fm = "https://i.ibb.co/h2CfVcX/Frame.png";
        this.nama = "lingz";
        
    }
    setName(value) {
        this.nama = value;
        return this;
    }
    
    async toAttachment() {
    
    

        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");
        
        //background
        let iyga = await Canvas.loadImage(this.loli);
       ctx.drawImage(iyga, 0, 0, 600, 600);
  
       ctx.save();
	ctx.beginPath();
	ctx.rotate(-10 * Math.PI / 180);
	let usrname = this.nama;
    let name = usrname.length > 6 ? usrname.substring(0, 6) + "" : usrname;
    ctx.font = "115px Unitalic";
    ctx.textAlign = 'left';
    ctx.fillStyle = "#FF089F";
    ctx.fillText(name, -23, 547);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, -40, 560);
	ctx.restore();
    
  let fmr = await Canvas.loadImage(this.fm);
  ctx.drawImage(fmr , 0, 0, 600, 600);  
  
        return canvas;
    }
};
