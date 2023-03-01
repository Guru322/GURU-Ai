const Canvas = require("canvas");

module.exports = class Ship {

    constructor() {
        this.bg = "https://i.ibb.co/vqX8Bs6/Bg.png";
        this.avatar1 = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.avatar2 = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.nama1 = "lendra";
        this.nama2 = "lendra";
        this.num = "5";
        this.status = "bad";
    }
    setName1(value) {
        this.nama1 = value;
        return this;
    }
    setName2(value) {
        this.nama2 = value;
        return this;
    }
    setAvatar1(value) {
        this.avatar1 = value;
        return this;
    }
    setAvatar2(value) {
        this.avatar2 = value;
        return this;
    }
    setNum(value) {
        this.num = value;
        return this;
    }
    setStatus(value) {
        this.status = value;
        return this;
    }
    async toAttachment() {
        const canvas = Canvas.createCanvas(527, 225);
        const ctx = canvas.getContext("2d");
        
        let pp1 = await Canvas.loadImage(this.avatar1);
        ctx.drawImage(pp1, 28, 30, 183, 183);
        let pp2 = await Canvas.loadImage(this.avatar2);
        ctx.drawImage(pp2, 320, 30, 183, 183);
        
        let bg = await Canvas.loadImage(this.bg);
        ctx.drawImage(bg, 0, 0, 527, 225);
  
        

let usr = this.nama1;
let usir = this.nama2;
let name1 = usr.length > 7 ? usr.substring(0, 7) + " " : usr;
let name2 = usir.length > 7 ? usir.substring(0, 7) + " " : usir;

ctx.font = "25px Norican-Regular";
ctx.textAlign = 'center';
ctx.fillStyle = "#ffffff";
ctx.fillText(name1, 118, 213);
ctx.fillText(name2, 410, 213);
    
    ctx.font = "25px Norican-Regular";
    ctx.textAlign = 'center';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`~ ${this.num} ~`, 264, 111); 
    ctx.font = "35px Norican-Regular";
    ctx.fillStyle = "#ffceff";
    ctx.fillText(this.status, 264, 140);
    
        return canvas;
    }
};
