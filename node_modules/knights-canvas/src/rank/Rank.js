const Canvas = require("canvas");
  function intToString(num) {
    if (num < 1000) {
        return num;
    }
    var si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].v) {
            break;
        }
    }
    return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
}


module.exports = class Rank {

    constructor() {
        this.username = "LING MO";
        this.bg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT16N2zE1dR7OGFUgz6LCjqGYuoCXjWBl1LVA&usqp=CAU";
        this.avatar = "https://i.imgur.com/cNuEFiQ.jpg";
        this.assent = "https://i.ibb.co/nw0W323/20210805-083714.png";
        this.needxp = "100";
        this.currxp = "50";
        this.level = "2";
        this.rank = "https://i.ibb.co/02m3YmJ/HEROIC.png";
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
    setBg(value) {
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
    //role rank
    setRank(value) {
        this.rank = value;
        return this;
    }
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(800, 300);
        const ctx = canvas.getContext("2d");
        
        //xp
        const currxp = this.currxp;
        const needxp = this.needxp;
        var curr = intToString(currxp);
        var need = intToString(needxp);
        
        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // frame background 
        let b = await Canvas.loadImage(this.assent);
        ctx.drawImage(b, 0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 1;
	    ctx.beginPath(); 
	    ctx.strokeStyle = '#ffffff';  // some color/style
	    ctx.lineWidth = 5;  
	    let pp = await Canvas.loadImage(this.avatar);
	    ctx.drawImage(pp, 100, 90, 130, 130);
	    ctx.strokeRect(100, 90, 130, 130);
	
	
	
	     //full bar
	    let tessa = (600 * 400) / 600;
        if (tessa > 615 - 18.5) tessa = 400 - 18.5;
        ctx.beginPath();
        ctx.fillStyle = "#d3d3d3";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, tessa, 37.5);
        ctx.arc(257 + 18.5 + tessa, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();        
        //bar current
        let widthXP = (currxp * 400) / needxp;
        if (widthXP > 615 - 18.5) widthXP = 400 - 18.5;
        ctx.beginPath();
        ctx.fillStyle = "#dc143c";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
        ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();
        //username
        ctx.globalAlpha = 1;
        ctx.font = "bold 30px Arial";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        let usr = this.username;
        let name = usr.length > 8 ? usr.substring(0, 10) + "..." : usr;
        ctx.fillText(name, 265, 170);
        //xp text
        ctx.font = "Bolder 25px Helvetica";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText(`${curr}/${need}`, 265, 250);
        //level
        ctx.font = "Bolder 25px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.fillText(`LEVEL ${this.level}`, 645, 250);
        //rank
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "white";
        ctx.rect(620, 35, 150, 110);
        ctx.stroke();        
        ctx.globalAlpha = 1;
        let rang = await Canvas.loadImage(this.rank);
        ctx.drawImage(rang, 625, 19, 150, 150);
         
        return canvas;
    }
};
