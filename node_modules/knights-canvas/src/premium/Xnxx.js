const Canvas = require("canvas");

module.exports = class Xnxx {

    constructor() {
        this.bg = "https://i.ibb.co/nzLr0CD/Xnxx.png";
        this.image = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.title = "lari ada wibu";
    }
     //avatar
    setImage(value) {
        this.image = value;
        return this;
    }
    //username
    setTitle(value) {
        this.title = value;
        return this;
    }
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(720, 790);
        const ctx = canvas.getContext("2d");
       
   
        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        // Draw images
        let images = await Canvas.loadImage(this.image);
        ctx.drawImage(images, 0, 20, 720, 457);

        var usrname = this.title;
        let name = usrname.length > 20 ? usrname.substring(0, 20) + "..." : usrname;
        ctx.globalAlpha = 1;
        ctx.font = "700 45px arial";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText(name, 30, 535);
        
        return canvas;
    }
};
