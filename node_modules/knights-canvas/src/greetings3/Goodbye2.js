const Canvas = require("canvas");

module.exports = class Goodbye3 {

    constructor() {
        this.bg = "https://i.ibb.co/6WMyfj6/20210811-203941.jpg";
        this.avatar = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.username = "Lenz";
    }
     //avatar
    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    //username
    setUsername(value) {
        this.username = value;
        return this;
    }
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(650, 300);
        const ctx = canvas.getContext("2d");
       
   
        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        let usrname = this.username;
        let name = usrname.length > 10 ? usrname.substring(0, 10) + "..." : usrname;
        ctx.globalAlpha = 1;
        ctx.font = "700 45px Courier New";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(name, 290, 338);
        
        let usrname = this.username;
        let name = usrname.length > 10 ? usrname.substring(0, 10) + "..." : usrname;
        ctx.globalAlpha = 1;
        ctx.font = "700 30px Courier New";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#000000";
        ctx.fillText(name, 325, 273);
        
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "white";
        ctx.arc(325, 150, 75, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        let avatar = await Canvas.loadImage(this.avatar);
        ctx.drawImage(avatar, 250, 75, 150, 150);
        ctx.restore();
	   
        return canvas;
    }
};
