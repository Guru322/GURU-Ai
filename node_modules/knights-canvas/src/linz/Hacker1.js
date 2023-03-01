const Canvas = require("canvas");
const { formatletiable, applyText } = require("../../utils/functions");

module.exports = class Hacker1 {

    constructor() {
        this.bg = "https://pandal.page/imgs/imgs/60b5a6aa512c1.jpg";
        this.heker = "https://i.ibb.co/yhny1hk/1622517139282.png";
        this.text = "KNIGHTS TEAM";    
        }
        //text
    setText(value) {
        this.text = value;
        return this;
    }
    
    async toAttachment() {
    	
      // Create canvas
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
  
  let img = await Canvas.loadImage(this.bg);
  ctx.drawImage(img, 0, 0, 1024, 1024);
  
         //text 1
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#77ffff";
        ctx.globalAlpha = 1;
        ctx.font = "bold 80px georgia"
        ctx.textAlign = 'center';
        ctx.fillStyle = "#c4ffff";
        ctx.fillText(this.text, 512, 290);
        
        //text 2
        ctx.font = "bold 80px georgia";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#7fffff";
		ctx.strokeStyle = "#7fffff";
		ctx.strokeText(this.text, 512, 390);
      
         //text 3
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#77ffff";
        ctx.globalAlpha = 1;
        ctx.font = "bold 80px georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#c4ffff";
        ctx.fillText(this.text, 512, 490);
        
        //text 4
        ctx.font = "bold 80px georgia";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#7fffff";
		ctx.strokeStyle = "#7fffff";
		ctx.strokeText(this.text, 512, 590);
		
		//text5
		ctx.shadowBlur = 20;
        ctx.shadowColor = "#77ffff";
        ctx.globalAlpha = 1;
        ctx.font = "bold 80px georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#c4ffff";
        ctx.fillText(this.text, 512, 690);
		
   ctx.shadowBlur = 20;
   ctx.shadowColor = "#cfffff";
   ctx.globalAlpha = 1;
  let anon = await Canvas.loadImage(this.heker);
  ctx.drawImage(anon, 0, 0, 1024, 1024);
  

return canvas;   
    }
};