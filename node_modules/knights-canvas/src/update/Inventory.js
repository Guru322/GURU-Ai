const Canvas = require("canvas");

module.exports = class Inventory {

    constructor() {
        this.username = "LING MO";
        this.bg = "https://i.ibb.co/PtrY9pp/IMG-20210623-154538-171.jpg";
        this.avatar = "https://i.imgur.com/cNuEFiQ.jpg";
        this.assent = "https://i.ibb.co/BtFYCR8/Inventory-v2.png";
        this.coal = "10";
        this.stone = "10";
        this.ore = "10";
        this.ingot = "10";
        this.wood = "10";
        this.fish = "10";
    }
     //avatar
    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    //background
    setBackground(value) {
        this.bg = value;
        return this;
    }
    //coal
    setCoal(value) {
        this.coal = value;
        return this;
    }
    //stone
    setStone(value) {
        this.stone = value;
        return this;
    }
    //ore
    setOre(value) {
        this.ore = value;
        return this;
    }
    //ingot
    setIngot(value) {
        this.ingot = value;
        return this;
    }
   setWood(value) {
        this.wood = value;
        return this;
    }
    setFish(value) {
        this.fish = value;
        return this;
    }
    
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(1280, 640);
        const ctx = canvas.getContext("2d");
     
        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // frame background 
        let b = await Canvas.loadImage(this.assent);
        ctx.drawImage(b, 0, 0, canvas.width, canvas.height);

        
        ctx.globalAlpha = 1;
	    ctx.beginPath(); 
	    ctx.strokeStyle = 'black';  // some color/style
	    ctx.lineWidth = 10;  
	    let pp = await Canvas.loadImage(this.avatar);
	    ctx.drawImage(pp, 60, 200, 250, 250);
	    ctx.strokeRect(60, 200, 250, 250);
         
         //coal
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.coal, 589, 293);
        
        //stone
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.stone, 850, 293);
        
         // copper ore
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.ore, 1120, 293);
        
        //copper ingot
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.ingot, 589, 560);
        
        //woods
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.wood, 850, 560);
        
        //fish
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(this.fish, 1120, 560);
        
        
        return canvas;
    }
};
