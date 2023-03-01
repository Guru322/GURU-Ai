const Canvas = require("canvas");
const { formatVariable, applyText } = require("../../utils/functions");

module.exports = class Spo {

    constructor() {
        this.frame = "https://i.ibb.co/ct0c6Yy/Spongebob.png";
        this.avatar = "https://i.imgur.com/uzmfBO4.jpg";
    }
     //avatar
    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    
    async toAttachment() {
    	
      // Create canvas
    const canvas = Canvas.createCanvas(550, 375);
    const ctx = canvas.getContext("2d");
    
    
   
  
  //avatar
  let avatar = await Canvas.loadImage(this.avatar);
  ctx.drawImage(avatar, 335, 8, 140, 172);
  
  
  
  let bg = await Canvas.loadImage(this.frame);
  ctx.drawImage(bg, 0, 0, 550, 375);
  
  
return canvas;   
    }
};