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


module.exports = class Bag {

    constructor() {
        this.bg = "https://i.ibb.co/PtrY9pp/IMG-20210623-154538-171.jpg";
        this.assent = "https://i.ibb.co/sgs9sfh/Inventory.png";
        this.stone = "10";
        this.coal = "10";
        this.wood = "10";
        this.core = "10";
        this.iore = "10";
        this.gore = "10";
        this.cingot = "10";
        this.iingot = "10";
        this.gingot = "10";
        this.diamond = "10";
        this.ruby = "10";
        this.leather = "10";
        this.meat = "10";
        this.fish = "10";
        
    }
    //background
    setBackground(value) {
        this.bg = value;
        return this;
    }
    //stone
    setStone(value) {
        this.stone = value;
        return this;
    }
    //coal
  setCoal(value) {
        this.gore = value;
        return this;
    }
    //wood
    setWood(value) {
        this.wood = value;
        return this;
    }
    //copper ore
    setCore(value) {
        this.core = value;
        return this;
    }
    //iron ore
    setIore(value) {
        this.iore = value;
        return this;
    }
    //gold ore
    setGore(value) {
        this.gore = value;
        return this;
    }
    //copper ingot
    setCingot(value) {
        this.cingot = value;
        return this;
    }
    //iron ingot
    setIingot(value) {
        this.iingot = value;
        return this;
    }
    //gold ingot
    setGingot(value) {
        this.gingot = value;
        return this;
    }
    //Diamond
    setDiamond(value) {
        this.diamond = value;
        return this;
    }
    //ruby
    setRuby(value) {
        this.ruby = value;
        return this;
    }
    //leather
    setLeather(value) {
        this.leather = value;
        return this;
    }
    //meat
    setMeat(value) {
        this.meat = value;
        return this;
    }
    //fish
    setFish(value) {
        this.fish = value;
        return this;
    }
    async toAttachment() {
    
    
        // Create canvas
        const canvas = Canvas.createCanvas(500, 333);
        const ctx = canvas.getContext("2d");
        
        // Draw background
        let background = await Canvas.loadImage(this.bg);
        ctx.drawImage(background, 0, 0, 500, 333);

          // frame background 
        let b = await Canvas.loadImage(this.assent);
        ctx.drawImage(b, 0, 0, 500, 333);

        ctx.globalAlpha = 1;
        ctx.font = "bold 15px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(intToString(this.stone), 52, 83);
        ctx.fillText(intToString(this.coal), 129, 83);
        ctx.fillText(intToString(this.wood), 202, 83);
        ctx.fillText(intToString(this.core), 278, 83);
        ctx.fillText(intToString(this.iore), 353, 83);
        
        //line 2       
        ctx.globalAlpha = 1;
        ctx.font = "bold 15px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(intToString(this.gore), 52, 158);
        ctx.fillText(intToString(this.cingot), 129, 158);
        ctx.fillText(intToString(this.iingot), 202, 158);
        ctx.fillText(intToString(this.gingot), 278, 158);
        ctx.fillText(intToString(this.diamond), 353, 158);
        
        ctx.globalAlpha = 1;
        ctx.font = "bold 15px arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = "black";
        ctx.fillText(intToString(this.ruby), 52, 233);
        ctx.fillText(intToString(this.meat), 129, 233);
        ctx.fillText(intToString(this.fish), 202, 233);
        ctx.fillText(intToString(this.leather), 278, 233);
        
        return canvas;
    }
};
