const Canvas = require("canvas");

module.exports = class Gay {

    constructor() {
        this.bg = "https://i.ibb.co/Zfq6HQ5/Bgay.jpg";
        this.fm = "https://i.ibb.co/RNxJBcZ/Gyf.png";
        this.pp = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.nama = "lendra";
        this.num = "87";
    }
    setName(value) {
        this.nama = value;
        return this;
    }
    setAvatar(value) {
        this.pp = value;
        return this;
    }
    setNum(value) {
        this.num = value;
        return this;
    }
    setGay(value) {
        this.gay = value;
        return this;
    }
    async toAttachment() {
        const canvas = Canvas.createCanvas(600, 450);
        const ctx = canvas.getContext("2d");
        
        let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 600, 450);
  
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'white';  // some color/style
	    ctx.lineWidth = 3;  
        ctx.arc(300, 160, 100, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        let pp = await Canvas.loadImage(this.pp);
        ctx.drawImage(pp, 200, 60, 200, 200);
        let frame = await Canvas.loadImage(this.fm);
        ctx.drawImage(frame, 200, 60, 200, 200);
        ctx.strokeRect(200, 60, 200, 200);
        ctx.restore();
          
    
    
    
let usr = this.nama;
let name = usr.length > 16 ? usr.substring(0, 16) + " " : usr;
ctx.font = "30px Bryndan";
ctx.textAlign = 'center';
ctx.fillStyle = "#ffffff";
ctx.fillText(`~${name}~`, 300, 300);
    
    ctx.font = "bold 48px Bryndan";
    ctx.textAlign = 'center';
    ctx.fillStyle = "#ff4b74";
    ctx.fillText(`~ ${this.num} ~`, 300, 370); 
     
        return canvas;
    }
};
