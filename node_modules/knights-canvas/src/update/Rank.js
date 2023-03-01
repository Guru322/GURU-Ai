const Canvas = require("canvas");

module.exports = class Rank {

    constructor() {
        this.username = "LING#404";
        this.bg = "https://i.ibb.co/PtrY9pp/IMG-20210623-154538-171.jpg";
        this.avatar = "https://i.ibb.co/G5mJZxs/rin.jpg";
        this.frame = "https://i.ibb.co/wWYR0bM/20210530-130437.png";
        this.assent = "https://i.ibb.co/H2x5HMT/Rank-card.png";
        this.needxp = "100";
        this.currxp = "50";
        this.level = "2";
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
    //background
    setBackground(value) {
        this.bg = value;
        return this;
    }
    //need xp
    setNeedxp(value) {
        this.needxp = value;
        return this;
    }
    //current xp
    setCurrxp(value) {
        this.currxp = value;
        return this;
    }
    //level
    setLevel(value) {
        this.level = value;
        return this;
    }
   setFrame(value) {
        this.frame = value;
        return this;
    }
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(800, 400);
        const ctx = canvas.getContext("2d");
     
       const currxp = this.currxp
       const needxp = this.needxp
       
       
       
       const percent = (100 * currxp) / needxp;
       const progress = (percent * 430) / 100;

        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // frame background 
        let b = await Canvas.loadImage(this.assent);
        ctx.drawImage(b, 0, 0, canvas.width, canvas.height);

        

        //username
        ctx.globalAlpha = 1;
        ctx.font = "bold 45px Arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        let usr = this.username
        let name = usr.length > 8 ? usr.substring(0, 10) + "..." : usr;
        ctx.fillText(name, 139, 345);
        
        
        
	 //avatar
  let avatar = await Canvas.loadImage(this.avatar);
  ctx.drawImage(avatar, 40, 100, 150, 150);
   
   //frame avatar
   let frames = await Canvas.loadImage(this.frame);
   ctx.drawImage(frames, 40, 100, 150, 150);
   
        //bar
	  ctx.shadowBlur = 20;
	  ctx.shadowColor = "#000000";
	  ctx.fillStyle = "#778899";
	  ctx.fillRect(330, 290, 430, 57);
	  ctx.fillStyle = "#001f73";
	  ctx.fillRect(330, 290, progress, 57)
	  ctx.strokeStyle = "#ffffff";
	  ctx.lineWidth = 5;
	  ctx.strokeRect(330, 290, 430, 57);
	  
	
	 ctx.font = "Bold 25px Arial";
     ctx.textAlign = 'center';
     ctx.fillStyle = "white";
     ctx.fillText(`${currxp} / ${needxp}`, 550, 330);
     
     
	  ctx.shadowBlur = 20;
	  ctx.shadowColor = "black";
	  ctx.globalAlpha = 1;
	  ctx.font = "bolder 30px Helvetica";
	  ctx.textAlign = 'center';
	  ctx.fillStyle = "white";
	  ctx.fillText(`LEVEL : ${this.level}`, 380, 400);
  
	    
         
        return canvas;
    }
};
