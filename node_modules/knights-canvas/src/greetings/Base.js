const Canvas = require("canvas");
const { formatVariable, applyText } = require("../../utils/functions");

module.exports = class Greeting {

    constructor() {
        this.username = "Clyde";
        this.guildName = "ServerName";
        this.colorTitleBorder = "#000000";
        this.colorMemberCount = "#ffffff";
        this.textMemberCount = "- {count}th member !";
        this.memberCount = "0";
        this.backgroundImage = `${__dirname}/../../assets/img/1px.png`;
        this.avatar = `${__dirname}/../../assets/img/default-avatar.png`;
        this.icon = `${__dirname}/../../assets/img/default-avatar.png`;
        this.opacityBorder = "0.4";
        this.colorBorder = "#000000";
        this.colorUsername = "#ffffff";
        this.colorUsernameBox = "#000000";
        this.opacityUsernameBox = "0.4";
        this.discriminator = "XXXX";
        this.colorDiscriminator = "#ffffff";
        this.opacityDiscriminatorBox = "0.4";
        this.colorDiscriminatorBox = "#000000";
        this.colorMessage = "#ffffff";
        this.colorHashtag = "#ffffff";
        this.colorBackground = "000000";
    }

    setAvatar(value) {
        this.avatar = value;
        return this;
    }
    
    setGuildIcon(value) {
        this.icon = value;
        return this;
    }
    
    setDiscriminator(value) {
        this.discriminator = value;
        return this;
    }
    
    setUsername(value) {
        this.username = value;
        return this;
    }
    
    setGuildName(value) {
        this.guildName = value;
        return this;
    }
    
    setMemberCount(value) {
        this.memberCount = value;
        return this;
    }
    
    setBackground(value) {
        this.backgroundImage = value;
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
        const canvas = Canvas.createCanvas(1024, 450);
        const ctx = canvas.getContext("2d");

        const guildName = this.textMessage.replace(/{server}/g, this.guildName);
        const memberCount = this.textMemberCount.replace(/{count}/g, this.memberCount);

        // Draw background
        ctx.fillStyle = this.colorBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let background = await Canvas.loadImage(this.backgroundImage);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // img 
        let b = await Canvas.loadImage(this.assent);
        ctx.drawImage(b, 0, 0, canvas.width, canvas.height);

        // Draw username
        ctx.globalAlpha = 1;
        ctx.font = "45px Bold";
        ctx.textAlign = 'center';
        ctx.fillStyle = this.colorUsername;
        ctx.fillText(this.username, canvas.width - 890, canvas.height - 60);
        const tagLength = ctx.measureText(this.username).width;
        
        // Draw membercount
        ctx.fillStyle = this.colorMemberCount;
        ctx.font = "22px Bold";
        ctx.fillText(memberCount, 90, canvas.height - 15);

        // Draw guild name
        ctx.globalAlpha = 1;
        ctx.font = "45px Bold";
        ctx.textAlign = 'center';
        ctx.fillStyle = this.colorMessage;
        let name = guildName.length > 13 ? guildName.substring(0, 10) + "..." : guildName;
        ctx.fillText(name, canvas.width - 225, canvas.height - 44);
        
        // Draw avatar circle
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.colorAvatar;
        ctx.arc(180, 160, 110, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(this.avatar);
        ctx.drawImage(avatar, 45, 40, 270, 270);
        ctx.restore();
         
        // Draw guild circle
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.colorAvatar;
        ctx.arc(canvas.width - 150, canvas.height - 200, 80, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const guildIco = await Canvas.loadImage(this.icon);
        ctx.drawImage(guildIco, canvas.width - 230, canvas.height - 280, 160, 160);
        ctx.restore();
        
        return canvas;
    }
};
