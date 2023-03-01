const Canvas = require("canvas");
const { formatVariable, applyText } = require("../../utils/functions");

module.exports = class Lickanime {

    constructor() {
        this.username = "Clyde";
        this.guildName = "ServerName";
        this.colorTitleBorder = "#000000";
        this.colorMemberCount = "#ffffff";
        this.textMemberCount = "- {count}th member !";
        this.memberCount = "0";
        this.backgroundImage = `${__dirname}/../../assets/img/putih.png`;
        this.avatar = `${__dirname}/../../assets/img/default-avatar.png`;
        this.lickimg = `${__dirname}/../../assets/img/girl-lick.png`;
    }

    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    
    setColor(variable, value) {
        const formattedVariable = formatVariable("color", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }
      
    setText(variable, value) {
        const formattedVariable = formatVariable("text", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }
    
    setOpacity(variable, value) {
        const formattedVariable = formatVariable("opacity", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }

    async toAttachment() {
        // Create canvas
        const canvas = Canvas.createCanvas(545, 562);
        const ctx = canvas.getContext("2d");

        // Draw background
        
        let background = await Canvas.loadImage(this.backgroundImage);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw Image
       ctx.drawImage(avatar, 5, 200, 69, 67);

          // img 
        let b = await Canvas.loadImage(this.lickimg);
        ctx.drawImage(b, 0, 0, canvas.width, canvas.height);
        
        return canvas;
    }
};
