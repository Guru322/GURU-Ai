const Canvas = require("canvas");
const { formatVariable, applyText } = require("../../utils/functions");

module.exports = class Hacker3 {

    constructor() {
        this.frame = "https://i.ibb.co/Dpjyw1R/Heker3.png";
        this.avatar = "https://pandal.page/imgs/imgs/60b5eb1e6d35d.jpg";
    }
     //avatar
    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    
    async toAttachment() {
    	
      // Create canvas
    const canvas = Canvas.createCanvas(853, 1224);
    const ctx = canvas.getContext("2d");   
  
  //avatar
  let avatar = await Canvas.loadImage(this.avatar);
  ctx.drawImage(avatar, 325, 1030, 210, 145);
  
  
  
  let bg = await Canvas.loadImage(this.frame);
  ctx.drawImage(bg, 0, 0, 853, 1224);
  
  
return canvas;   
    }
};