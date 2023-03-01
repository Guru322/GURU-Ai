const Canvas = require("canvas"),
  fs = require("fs"),
  fortnite = require("fortnite");
const {
  formatVariable,
  applyText,
} = require("../../utils/functions");

module.exports = class FortniteStats {
  constructor() {
    this.token = null;
    this.platform = null;
    this.user = null;
    this.textFooter = "Generated with discord-canvas - fortnitetracker.com";
    this.textAverageKills = "KILLS/MATCH";
    this.textAverageKill = "KILL/MATCH";
    this.textWPercent = "W%";
    this.textWinPercent = "WIN%";
    this.textKD = "K/D";
    this.textWins = "WINS";
    this.textWin = "WIN";
    this.textKills = "KILLS";
    this.textKill = "KILL";
    this.textMatches = "MATCHES";
    this.textMatch = "MATCH";

    this.data = null;

  }

  async fetchPlayerData(){
    if (!this.token) return console.log("Please enter a valid token fortnitetracker.com !");

    let fortniteClient = new fortnite(this.token);
    let user = this.user;
    let platform = this.platform.toLowerCase();
    if(platform !== "pc" && platform !== "xbl" && platform !== "psn") return false;
    let tdata = await fortniteClient.user(user, platform);
    this.data = tdata.code === 404 ? false : tdata
  }

  setToken(value) {
    this.token = value;
    return this;
  }

  setPlatform(value) {
    this.platform = value;
    return this;
  }

  setUser(value) {
    this.user = value;
    return this;
  }

  setText(variable, value) {
    const formattedVariable = formatVariable("text", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  async toAttachment() {
    
    await this.fetchPlayerData();
    if(!this.data) return false;

    let canvas = Canvas.createCanvas(975, 650),
    ctx = canvas.getContext("2d");

    // Background stats
    let background = await Canvas.loadImage(`${__dirname}/../../assets/img/fortnite/stats/background.png`);
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw layers
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#000000";
    ctx.fillRect(51, 28, 594, 114);
    ctx.fillRect(51, 113, 594, 30);
    ctx.fillRect(671, 113, 258, 30);
    ctx.fillRect(51, 164, 257, 57);
    ctx.fillRect(361, 164, 257, 57);
    ctx.fillRect(671, 164, 257, 57);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(51, 221, 257, 4);
    ctx.fillRect(361, 221, 257, 4);
    ctx.fillRect(671, 221, 257, 4);
    ctx.fillRect(51, 296, 257, 4);
    ctx.fillRect(361, 296, 257, 4);
    ctx.fillRect(671, 296, 257, 4);
    ctx.fillRect(51, 373, 257, 4);
    ctx.fillRect(361, 373, 257, 4);
    ctx.fillRect(671, 373, 257, 4);
    ctx.fillRect(51, 451, 257, 4);
    ctx.fillRect(361, 451, 257, 4);
    ctx.fillRect(671, 451, 257, 4);
    ctx.fillRect(51, 529, 257, 4);
    ctx.fillRect(361, 529, 257, 4);
    ctx.fillRect(671, 529, 257, 4);
    ctx.fillRect(51, 605, 257, 4);
    ctx.fillRect(361, 605, 257, 4);
    ctx.fillRect(671, 605, 257, 4);
    ctx.globalAlpha = 1;
    // Draw xbox, pc or psn logo
    let iconPlatform = await Canvas.loadImage(`${__dirname}/../../assets/img/fortnite/stats/${this.platform}.png`);
    ctx.drawImage(iconPlatform, 62, 43, 60, 60);
    // Draw crown logo
    let iconCrown = await Canvas.loadImage(`${__dirname}/../../assets/img/fortnite/stats/crown.png`);
    ctx.drawImage(iconCrown, canvas.width - 280, 41, 60, 60);
    // Draw username
    ctx.fillStyle = "#dcdfd9";
    ctx.font = "50px luckiest guy";
    ctx.textAlign = "center";
    ctx.fillText(this.data.username, canvas.width - 630, canvas.height - 560);
    // Draw Wins Lifetime
    ctx.font = "60px luckiest guy";
    ctx.textAlign = "left";
    ctx.fillText(this.data.stats.lifetime.wins, canvas.width - 205, canvas.height - 557);
    // Draw average kills, matches and kills lifetime
    ctx.textAlign = "center";
    ctx.font = "18px KeepCalm";
    if(this.data.stats.lifetime){
    let averageKills = (this.data.stats.lifetime.kills / this.data.stats.lifetime.matches),
    averageKillsText = averageKills.toFixed(2)+" "+(averageKills > 1 ? this.textAverageKills : this.textAverageKill),
    lifetimeKillsText = this.data.stats.lifetime.kills+" "+(this.data.stats.lifetime.kills > 1 ? this.textKills : this.textKill),
    lifetimeMatchesText = this.data.stats.lifetime.matches+" "+(this.data.stats.lifetime.matches > 1 ? this.textMatches : this.textMatch);
    ctx.fillText(lifetimeMatchesText+" - "+lifetimeKillsText+" - "+averageKillsText, 350, canvas.height - 515);
    } else {
        let lifetimeKillsText = "0 "+this.textKills,
        averageKillsText = "0.00 "+this.textAverageKill,
        lifetimeMatchesText = "0 "+this.textMatch;
        ctx.fillText(lifetimeMatchesText+" - "+lifetimeKillsText+" - "+averageKillsText, 350, canvas.height - 515);
    }
    // Draw K/D and WIN% lifetime
    if(this.data.stats.lifetime){
    let winsLifetimePercent = (this.data.stats.lifetime.wins / this.data.stats.lifetime.matches * 100);
    ctx.fillText(`${this.data.stats.lifetime.kd} ${this.textKD} - ${winsLifetimePercent.toFixed(2)} ${this.textWPercent}`, canvas.width - 174, canvas.height - 515);
    } else {
        let winsLifetimePercent = "0.00",
        statsLifetimeKD = "0";
        ctx.fillText(`${statsLifetimeKD} ${this.textKD} - ${winsLifetimePercent} ${this.textWPercent}`, canvas.width - 174, canvas.height - 515);
    }
    // Draw col solo : TITLE
    ctx.font = "37px KeepCalm";
    ctx.fillText("SOLO", 176, canvas.height - 443);
    // Draw col solo : KD
    ctx.font = "26px KeepCalm";
    if(this.data.stats.solo){
    ctx.fillText(this.data.stats.solo.kd+" "+this.textKD, 176, canvas.height - 375);
    } else {
        ctx.fillText("0 "+this.textKD, 176, canvas.height - 375);
    }
    // Draw col solo : WINS
    if(this.data.stats.solo){
        if(this.data.stats.solo.wins > 1) {
            ctx.fillText(this.data.stats.solo.wins+" "+this.textWins, 176, canvas.height - 302);
        } else {
            ctx.fillText(this.data.stats.solo.wins+" "+this.textWin, 176, canvas.height - 302);
        }
    } else {
        ctx.fillText("0 "+this.textWin, 176, canvas.height - 302);
    }
    // Draw col solo : KILLS
    if(this.data.stats.solo){
        if(this.data.stats.solo.kills > 1) {
            ctx.fillText(this.data.stats.solo.kills+" "+this.textKills, 176, canvas.height - 222);
        } else {
            ctx.fillText(this.data.stats.solo.kills+" "+this.textKill, 176, canvas.height - 222);
        }
    } else {
        ctx.fillText("0 "+this.textKill, 176, canvas.height - 222);
    }
    // Draw col solo : WIN%
    if(this.data.stats.solo){
    let winsSoloPercent = (this.data.stats.solo.wins / this.data.stats.solo.matches * 100);
    ctx.fillText(winsSoloPercent.toFixed(2)+" "+this.textWinPercent, 176, canvas.height - 145);
    } else {
        ctx.fillText("0.00 "+this.textWinPercent, 176, canvas.height - 145);
    }
    // Draw col solo : MATCHES
    if(this.data.stats.solo){
        if(this.data.stats.solo.matches > 1) {
            ctx.fillText(this.data.stats.solo.matches+" "+this.textMatches, 176, canvas.height - 67);
        } else {
            ctx.fillText(this.data.stats.solo.matches+" "+this.textMatch, 176, canvas.height - 67);
        }
    } else {
        ctx.fillText("0 "+this.textMatch, 176, canvas.height - 67);
    }
    // Draw col duo : TITLE
    ctx.font = "37px KeepCalm";
    ctx.fillText("DUO", 485, canvas.height - 443);
    // Draw col duo : KD
    ctx.font = "26px KeepCalm";
    if(this.data.stats.duo){
    ctx.fillText(this.data.stats.duo.kd+" "+this.textKD, 485, canvas.height - 375);
    } else {
        ctx.fillText("0 "+this.textKD, 485, canvas.height - 375);
    }
    // Draw col duo : WINS
    if(this.data.stats.duo){
        if(this.data.stats.duo.wins > 1) {
            ctx.fillText(this.data.stats.duo.wins+" "+this.textWins, 485, canvas.height - 302);
        } else {
            ctx.fillText(this.data.stats.duo.wins+" "+this.textWin, 485, canvas.height - 302);
        }
    } else {
        ctx.fillText("0 "+this.textWin, 485, canvas.height - 302);
    }
    // Draw col duo : KILLS
    if(this.data.stats.duo){
        if(this.data.stats.duo.kills > 1) {
            ctx.fillText(this.data.stats.duo.kills+" "+this.textKills, 485, canvas.height - 222);
        } else {
            ctx.fillText(this.data.stats.duo.kills+" "+this.textKill, 485, canvas.height - 222);
        }
    } else {
        ctx.fillText("0 "+this.textKill, 485, canvas.height - 222);
    }
    // Draw col duo : WIN%
    if(this.data.stats.duo){
    let winsDuoPercent = (this.data.stats.duo.wins / this.data.stats.duo.matches * 100);
    ctx.fillText(winsDuoPercent.toFixed(2)+" "+this.textWinPercent, 485, canvas.height - 145);
    } else {
        ctx.fillText("0.00 "+this.textWinPercent, 485, canvas.height - 145);
    }
    // Draw col duo : MATCHES
    if(this.data.stats.duo){
        if(this.data.stats.duo.matches > 1) {
            ctx.fillText(this.data.stats.duo.matches+" "+this.textMatches, 485, canvas.height - 67);
        } else {
            ctx.fillText(this.data.stats.duo.matches+" "+this.textMatch, 485, canvas.height - 67);
        }
    } else {
        ctx.fillText("0 "+this.textMatch, 485, canvas.height - 67);
    }
    // Draw col squad : TITLE
    ctx.font = "37px KeepCalm";
    ctx.fillText("SQUAD", canvas.width - 174, canvas.height - 443);
    // Draw col squad : KD
    ctx.font = "26px KeepCalm";
    if(this.data.stats.squad){
    ctx.fillText(this.data.stats.squad.kd+" "+this.textKD, canvas.width - 174, canvas.height - 375);
    } else {
        ctx.fillText("0 "+this.textKD, canvas.width - 174, canvas.height - 375);
    }
    // Draw col squad : WINS
    if(this.data.stats.squad){
        if(this.data.stats.squad.wins > 1) {
            ctx.fillText(this.data.stats.squad.wins+" "+this.textWins, canvas.width - 174, canvas.height - 302);
        } else {
            ctx.fillText(this.data.stats.squad.wins+" "+this.textWin, canvas.width - 174, canvas.height - 302);
        }
    } else {
        ctx.fillText("0 "+this.textWin, canvas.width - 174, canvas.height - 302);
    }
    // Draw col squad : KILLS
    if(this.data.stats.squad){
        if(this.data.stats.squad.kills > 1) {
            ctx.fillText(this.data.stats.squad.kills+" "+this.textKills, canvas.width - 174, canvas.height - 222);
        } else {
            ctx.fillText(this.data.stats.squad.kills+" "+this.textKill, canvas.width - 174, canvas.height - 222);
        }
    } else {
        ctx.fillText("0 "+this.textKill, canvas.width - 174, canvas.height - 222);
    }
    // Draw col squad : WIN%
    if(this.data.stats.squad){
    let winsSquadPercent = (this.data.stats.squad.wins / this.data.stats.squad.matches * 100);
    ctx.fillText(winsSquadPercent.toFixed(2)+" "+this.textWinPercent, canvas.width - 174, canvas.height - 145);
    } else {
        ctx.fillText("0.00 "+this.textWinPercent, canvas.width - 174, canvas.height - 145);
    }
    // Draw col squad : MATCHES
    if(this.data.stats.squad){
        if(this.data.stats.squad.matches > 1) {
            ctx.fillText(this.data.stats.squad.matches+" "+this.textMatches, canvas.width - 174, canvas.height - 67);
        } else {
            ctx.fillText(this.data.stats.squad.matches+" "+this.textMatch, canvas.width - 174, canvas.height - 67);
        }
    } else {
        ctx.fillText("0 "+this.textMatch, canvas.width - 174, canvas.height - 67);
    }
    // Draw footer
    ctx.font = "21px KeepCalm";
    ctx.fillText(this.textFooter, canvas.width / 2, canvas.height - 10); 


    return canvas;

  }

};
